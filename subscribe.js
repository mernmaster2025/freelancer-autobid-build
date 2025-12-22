// Storage service wrapper for standalone page
// Since this is a web accessible resource, we can't use ES6 imports
// Use chrome.storage directly with a simple wrapper
const storageService = {
  async get(key) {
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.get([key], (result) => {
          if (chrome.runtime.lastError) {
            resolve(null);
          } else {
            const value = result[key];
            // Parse if it's a JSON string
            if (typeof value === 'string') {
              try {
                resolve(JSON.parse(value));
              } catch {
                resolve(value);
              }
            } else {
              resolve(value);
            }
          }
        });
      } else {
        resolve(null);
      }
    });
  }
};

// Pricing configuration
// Discounts: monthly (0%), 3month (10%), 6month (20%), annual (30%)
const pricing = {
  premium: {
    monthly: { stripe: 4.99, crypto: 4.49 },
    '3month': { stripe: 13.47, crypto: 12.12 },
    '6month': { stripe: 23.95, crypto: 21.55 },
    annual: { stripe: 41.92, crypto: 37.72 }
  },
  ultra: {
    monthly: { stripe: 9.99, crypto: 8.99 },
    '3month': { stripe: 26.97, crypto: 24.27 },
    '6month': { stripe: 47.95, crypto: 43.15 },
    annual: { stripe: 83.92, crypto: 75.52 }
  }
};

// Plan configuration
const planConfig = {
  premium: { name: 'Premium' },
  ultra: { name: 'Ultra' }
};

// Stripe is not loaded in extension pages (CSP restriction)
// We'll use Stripe Checkout redirect flow only

// Crypto payment state
let cryptoPaymentData = null;
let paymentStatusInterval = null;
let selectedCryptoCurrency = 'btc'; // Default to Bitcoin
let cryptoCurrencies = []; // Will be loaded from API

// Get plan and billing from URL
const urlParams = new URLSearchParams(window.location.search);
let currentPlan = urlParams.get('plan') || 'premium';
let currentBilling = urlParams.get('billing') || 'monthly';
let currentPaymentMethod = 'stripe';

// Validate plan
if (!['premium', 'ultra'].includes(currentPlan)) {
  currentPlan = 'premium';
}

// Validate billing cycle
if (!['monthly', '3month', '6month', 'annual'].includes(currentBilling)) {
  currentBilling = 'monthly';
}

// Load cryptocurrencies from API
async function loadCryptoCurrencies() {
  try {
    const authData = await getAuthData();
    const accessToken = authData?.session?.access_token;
    
    const config = await getSupabaseConfig();
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    const response = await fetch(`${config.url}/functions/v1/get-crypto-currencies`, {
      method: 'GET',
      headers: headers,
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.currencies && Array.isArray(data.currencies)) {
        // Transform NowPayments currency data to our format
        cryptoCurrencies = data.currencies
          .filter((currency) => currency.enable === true) // Only enabled currencies
          .map((currency) => ({
            code: currency.code.toLowerCase(),
            name: currency.name || currency.code,
            logo_url: currency.logo_url 
              ? (currency.logo_url.startsWith('http') 
                  ? currency.logo_url 
                  : `https://nowpayments.io${currency.logo_url}`)
              : null,
          }));
        
        // Sort by popularity/common currencies first
        const popularCodes = ['btc', 'eth', 'usdt', 'usdc', 'ltc', 'xrp', 'doge', 'trx'];
        cryptoCurrencies.sort((a, b) => {
          const aIndex = popularCodes.indexOf(a.code);
          const bIndex = popularCodes.indexOf(b.code);
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return a.name.localeCompare(b.name);
        });
        
        // If crypto payment section is already rendered, refresh it
        if (currentPaymentMethod === 'crypto' && !cryptoPaymentData) {
          renderPaymentSection();
        }
        return;
      }
    }
  } catch (error) {
    console.error('Failed to load cryptocurrencies from API:', error);
  }
}

// Initialize UI
async function initializeUI() {
  try {
    // Load cryptocurrencies from API
    await loadCryptoCurrencies();
    
    updatePlanBillingText();
    updateTotalAmount();
    renderPaymentSection();
    attachPaymentMethodListeners();
  } catch (error) {
    console.error('Error initializing UI:', error);
  }
}

function updatePlanBillingText() {
  const planName = planConfig[currentPlan].name;
  const billingLabels = {
    monthly: 'Monthly',
    '3month': 'Quarterly',
    '6month': 'Semi-Annual',
    annual: 'Annual'
  };
  const billingText = billingLabels[currentBilling] || currentBilling.charAt(0).toUpperCase() + currentBilling.slice(1);
  document.getElementById('plan-billing-text').textContent = `${planName} - ${billingText}`;
}

function updateTotalAmount() {
  const basePrice = pricing[currentPlan][currentBilling].stripe;
  const cryptoPrice = pricing[currentPlan][currentBilling].crypto;
  const discount = basePrice - cryptoPrice;
  const isCrypto = currentPaymentMethod === 'crypto';
  const finalPrice = isCrypto ? cryptoPrice : basePrice;
  
  const totalAmountEl = document.getElementById('total-amount');
  if (isCrypto) {
    totalAmountEl.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px; justify-content: flex-end;">
        <span style="text-decoration: line-through; color: #94a3b8; font-size: 1.2rem;">$${basePrice.toFixed(2)}</span>
        <span>$${finalPrice.toFixed(2)}</span>
      </div>
    `;
  } else {
    totalAmountEl.textContent = `$${finalPrice.toFixed(2)}`;
  }
}

// Render cryptocurrency dropdown options
function renderCryptoDropdownOptions(currencies, selectedCode) {
  // Helper function to get logo URL
  const getLogoUrl = (crypto) => {
    if (crypto.logo_url) {
      // If already a full URL, use it
      if (crypto.logo_url.startsWith('http')) {
        return crypto.logo_url;
      }
      // If relative path, prepend nowpayments.io domain
      return `https://nowpayments.io${crypto.logo_url.startsWith('/') ? '' : '/'}${crypto.logo_url}`;
    }
    // Fallback: try to construct URL from code
    return `https://nowpayments.io/images/coins/${crypto.code}.svg`;
  };
  
  if (currencies.length === 0) {
    return `
      <div class="crypto-dropdown-item" data-code="btc">
        <img src="https://nowpayments.io/images/coins/btc.svg" alt="Bitcoin" class="crypto-logo-small" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
        <div class="crypto-logo-placeholder" style="display: none;"></div>
        <span>Bitcoin</span>
      </div>
      <div class="crypto-dropdown-item" data-code="eth">
        <img src="https://nowpayments.io/images/coins/eth.svg" alt="Ethereum" class="crypto-logo-small" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
        <div class="crypto-logo-placeholder" style="display: none;"></div>
        <span>Ethereum</span>
      </div>
    `;
  }
  
  return currencies.map(crypto => {
    const logoUrl = getLogoUrl(crypto);
    return `
    <div class="crypto-dropdown-item ${selectedCode === crypto.code ? 'selected' : ''}" data-code="${crypto.code}">
      <img src="${logoUrl}" alt="${crypto.name}" class="crypto-logo-small" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
      <div class="crypto-logo-placeholder" style="display: none;"></div>
      <span>${crypto.name}</span>
    </div>
    `;
  }).join('');
}

// Initialize custom cryptocurrency dropdown
function initializeCryptoDropdown() {
  const dropdown = document.getElementById('crypto-dropdown');
  const trigger = document.getElementById('crypto-dropdown-trigger');
  const menu = document.getElementById('crypto-dropdown-menu');
  const searchInput = document.getElementById('crypto-search-input');
  const list = document.getElementById('crypto-dropdown-list');
  
  if (!dropdown || !trigger || !menu || !searchInput || !list) return;
  
  // Toggle dropdown
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.style.display !== 'none';
    menu.style.display = isOpen ? 'none' : 'block';
    if (!isOpen) {
      searchInput.focus();
    }
  });
  
  // Close dropdown when clicking outside
  const handleOutsideClick = (e) => {
    if (!dropdown.contains(e.target)) {
      menu.style.display = 'none';
    }
  };
  document.addEventListener('click', handleOutsideClick);
  
  // Handle search
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const items = list.querySelectorAll('.crypto-dropdown-item');
    
    items.forEach(item => {
      const name = item.querySelector('span')?.textContent.toLowerCase() || '';
      const code = item.dataset.code?.toLowerCase() || '';
      const matches = name.includes(searchTerm) || code.includes(searchTerm);
      item.style.display = matches ? 'flex' : 'none';
    });
  });
  
  // Handle item selection
  list.addEventListener('click', (e) => {
    const item = e.target.closest('.crypto-dropdown-item');
    if (!item) return;
    
    const code = item.dataset.code;
    if (!code) return;
    
    selectedCryptoCurrency = code;
    
    // Update selected item display
    const selectedCrypto = cryptoCurrencies.find(c => c.code === code) || 
      { code: code, name: item.querySelector('span')?.textContent || code, logo_url: null };
    
    // Helper function to get logo URL
    const getLogoUrl = (crypto) => {
      if (crypto.logo_url) {
        if (crypto.logo_url.startsWith('http')) {
          return crypto.logo_url;
        }
        return `https://nowpayments.io${crypto.logo_url.startsWith('/') ? '' : '/'}${crypto.logo_url}`;
      }
      return `https://nowpayments.io/images/coins/${crypto.code}.svg`;
    };
    
    const selectedLogoUrl = getLogoUrl(selectedCrypto);
    
    const selectedItem = trigger.querySelector('.crypto-selected-item');
    selectedItem.innerHTML = `
      <img src="${selectedLogoUrl}" alt="${selectedCrypto.name}" class="crypto-logo-small" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
      <div class="crypto-logo-placeholder" style="display: none;"></div>
      <span class="crypto-selected-name">${selectedCrypto.name}</span>
    `;
    
    // Update selected state in list
    list.querySelectorAll('.crypto-dropdown-item').forEach(i => {
      i.classList.remove('selected');
    });
    item.classList.add('selected');
    
    // Close dropdown
    menu.style.display = 'none';
    searchInput.value = '';
    
    // Reset search filter
    list.querySelectorAll('.crypto-dropdown-item').forEach(i => {
      i.style.display = 'flex';
    });
  });
}

function renderPaymentSection() {
  const basePrice = pricing[currentPlan][currentBilling].stripe;
  const cryptoPrice = pricing[currentPlan][currentBilling].crypto;
  const discount = basePrice - cryptoPrice;
  const isCrypto = currentPaymentMethod === 'crypto';
  const finalPrice = isCrypto ? cryptoPrice : basePrice;

  const paymentSection = document.getElementById('payment-section');
  
  if (isCrypto) {
    // Crypto payment section - show initial button or payment details
    if (cryptoPaymentData) {
      renderCryptoPaymentDetails();
    } else {
      // Get selected currency info
      const selectedCrypto = cryptoCurrencies.find(c => c.code === selectedCryptoCurrency) || 
        (cryptoCurrencies.length > 0 ? cryptoCurrencies[0] : { code: 'btc', name: 'Bitcoin', logo_url: null });
      
      // Helper function to get logo URL
      const getLogoUrl = (crypto) => {
        if (crypto.logo_url) {
          if (crypto.logo_url.startsWith('http')) {
            return crypto.logo_url;
          }
          return `https://nowpayments.io${crypto.logo_url.startsWith('/') ? '' : '/'}${crypto.logo_url}`;
        }
        return `https://nowpayments.io/images/coins/${crypto.code}.svg`;
      };
      
      const selectedLogoUrl = getLogoUrl(selectedCrypto);
      
      paymentSection.innerHTML = `
        <div class="crypto-payment-info">
          <div class="crypto-selector">
            <label class="crypto-selector-label">Select Cryptocurrency:</label>
            <div class="custom-crypto-dropdown" id="crypto-dropdown">
              <div class="crypto-dropdown-trigger" id="crypto-dropdown-trigger">
                <div class="crypto-selected-item">
                  <img src="${selectedLogoUrl}" alt="${selectedCrypto.name}" class="crypto-logo-small" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
                  <div class="crypto-logo-placeholder" style="display: none;"></div>
                  <span class="crypto-selected-name">${selectedCrypto.name}</span>
                </div>
                <i class="fas fa-chevron-down crypto-dropdown-arrow"></i>
              </div>
              <div class="crypto-dropdown-menu" id="crypto-dropdown-menu" style="display: none;">
                <div class="crypto-search-container">
                  <i class="fas fa-search crypto-search-icon"></i>
                  <input type="text" id="crypto-search-input" class="crypto-search-input" placeholder="Search cryptocurrency...">
                </div>
                <div class="crypto-dropdown-list" id="crypto-dropdown-list">
                  ${renderCryptoDropdownOptions(cryptoCurrencies, selectedCryptoCurrency)}
                </div>
              </div>
            </div>
          </div>
          <button class="checkout-btn crypto" id="checkout-btn">
            <i class="fas fa-lock"></i> Create Payment
          </button>
        </div>
      `;
      
      // Initialize custom dropdown
      initializeCryptoDropdown();
      
      // Re-attach event listener to checkout button
      document.getElementById('checkout-btn').addEventListener('click', handleCheckout);
    }
  } else {
    // Stripe payment section - redirect to Stripe Checkout
    paymentSection.innerHTML = `
      <div class="stripe-info-box">
        <i class="fab fa-stripe"></i>
        <p>Secure payment powered by Stripe</p>
        <p class="stripe-info-subtitle">You'll be redirected to Stripe's secure checkout page</p>
      </div>
      <button class="checkout-btn" id="checkout-btn">
        <i class="fas fa-lock"></i> Pay with Stripe
      </button>
    `;
    
    // Re-attach event listener to checkout button
    document.getElementById('checkout-btn').addEventListener('click', handleCheckout);
  }
}

function handleCheckout() {
  const btn = document.getElementById('checkout-btn');
  const errorEl = document.getElementById('error-message');
  const successEl = document.getElementById('success-message');

  if (!btn) {
    console.error('Checkout button not found');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span class="loading"></span> Processing...';
  if (errorEl) errorEl.classList.remove('show');
  if (successEl) successEl.classList.remove('show');

  (async () => {
    try {
      if (currentPaymentMethod === 'stripe') {
        await handleStripePayment(currentPlan, currentBilling);
      } else {
        await handleCryptoPayment(currentPlan, currentBilling);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      if (errorEl) {
        errorEl.textContent = error.message || 'Payment failed. Please try again.';
        errorEl.classList.add('show');
      }
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `
          <i class="fas fa-lock"></i> 
          ${currentPaymentMethod === 'stripe' ? 'Pay with Stripe' : 'Create Payment'}
        `;
      }
    }
  })();
}

// Payment method toggle - attach after DOM is ready
function attachPaymentMethodListeners() {
  const stripeBtn = document.getElementById('payment-stripe');
  const cryptoBtn = document.getElementById('payment-crypto');
  
  if (!stripeBtn || !cryptoBtn) {
    console.error('Payment method buttons not found. Retrying...');
    // Retry after a short delay
    setTimeout(attachPaymentMethodListeners, 100);
    return;
  }
  
  // Remove any existing listeners by using once option or storing reference
  stripeBtn.onclick = null;
  cryptoBtn.onclick = null;
  
  // Attach listeners
  stripeBtn.addEventListener('click', () => {
    // Clear crypto payment data when switching to Stripe
    if (paymentStatusInterval) {
      clearInterval(paymentStatusInterval);
      paymentStatusInterval = null;
    }
    cryptoPaymentData = null;
    
    currentPaymentMethod = 'stripe';
    stripeBtn.classList.add('active');
    cryptoBtn.classList.remove('active');
    updateTotalAmount();
    renderPaymentSection();
  });
  
  cryptoBtn.addEventListener('click', () => {
    currentPaymentMethod = 'crypto';
    cryptoBtn.classList.add('active');
    stripeBtn.classList.remove('active');
    updateTotalAmount();
    renderPaymentSection();
  });
  
  console.log('Payment method listeners attached');
}

async function handleStripePayment(plan, billing) {
  try {
    const authData = await getAuthData();
    if (!authData?.user?.id) {
      throw new Error('Please login first');
    }

    // Check if we have a valid access token
    const accessToken = authData.session?.access_token;
    if (!accessToken) {
      throw new Error('No access token found. Please login again.');
    }

    const config = await getSupabaseConfig();
    const price = pricing[plan][billing].stripe;
    
    // Create Stripe Checkout session
    const response = await fetch(`${config.url}/functions/v1/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'apikey': config.anonKey
      },
      body: JSON.stringify({ plan, billing, price })
    });

    // Check response status
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: `HTTP ${response.status}: ${response.statusText}` }));
      throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    // Redirect to Stripe Checkout
    if (data.sessionId) {
      // Redirect to Stripe Checkout page
      window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
    } else if (data.url) {
      // If backend returns a direct URL, use it
      window.location.href = data.url;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    throw error;
  }
}

async function handleCryptoPayment(plan, billing) {
  try {
    const authData = await getAuthData();
    console.log(`[FreelancerBot-CryptoPayment] authData: ${JSON.stringify(authData)}`);
    if (!authData?.user?.id) {
      throw new Error('Please login first');
    }

    const config = await getSupabaseConfig();
    const price = pricing[plan][billing].crypto;
    
    const btn = document.getElementById('checkout-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="loading"></span> Creating payment...';

    // Check if we have a valid access token
    const accessToken = authData.session?.access_token;
    if (!accessToken) {
      throw new Error('No access token found. Please login again.');
    }

    const response = await fetch(`${config.url}/functions/v1/create-crypto-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ plan, billing, price, pay_currency: selectedCryptoCurrency })
    });

    // Check response status
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: `HTTP ${response.status}: ${response.statusText}` }));
      throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    // NowPayments might not return payAddress immediately (user selects crypto later)
    // So we'll use paymentUrl and handle payAddress being optional
    if (data.paymentUrl) {
      // Store payment data
      cryptoPaymentData = {
        paymentUrl: data.paymentUrl,
        paymentId: data.paymentId,
        orderId: data.orderId,
        payAddress: data.payAddress || null, // May be null until user selects crypto
        payAmount: data.payAmount || null, // May be null until user selects crypto
        payCurrency: data.payCurrency || null, // May be null until user selects crypto
        priceAmount: price,
        priceCurrency: 'usd',
        status: data.status || 'waiting'
      };

      // Store in sessionStorage for verification
      if (data.paymentId) {
        sessionStorage.setItem('crypto_payment_id', data.paymentId);
        sessionStorage.setItem('crypto_order_id', data.orderId);
      }

      // Render payment details UI
      renderCryptoPaymentDetails();
      
      // Start polling payment status
      startPaymentStatusPolling();
    } else {
      throw new Error('Failed to create payment link');
    }
  } catch (error) {
    const btn = document.getElementById('checkout-btn');
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-lock"></i> Create Payment';
    throw error;
  }
}

function renderCryptoPaymentDetails() {
  if (!cryptoPaymentData || !cryptoPaymentData.paymentUrl) return;

  const paymentSection = document.getElementById('payment-section');
  const hasPaymentDetails = cryptoPaymentData.payAddress && cryptoPaymentData.payAmount && cryptoPaymentData.payCurrency;

  // Generate QR code URL if we have payment address
  const qrCodeUrl = hasPaymentDetails 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(cryptoPaymentData.payAddress)}`
    : null;

  paymentSection.innerHTML = `
    <div class="crypto-payment-details">
      <div class="payment-status-header">
        <div class="status-indicator ${cryptoPaymentData.status}">
          <i class="fas fa-circle-notch fa-spin"></i>
          <span>Payment created</span>
        </div>
      </div>

      <div class="crypto-amount-box">
        <div class="crypto-amount-label">Amount to Pay</div>
        <div class="crypto-amount-value">
          ${hasPaymentDetails 
            ? `${cryptoPaymentData.payAmount} ${cryptoPaymentData.payCurrency.toUpperCase()}`
            : `$${cryptoPaymentData.priceAmount.toFixed(2)} USD`
          }
        </div>
        ${hasPaymentDetails ? `<div class="crypto-amount-usd">≈ $${cryptoPaymentData.priceAmount.toFixed(2)} USD</div>` : ''}
      </div>

      ${hasPaymentDetails ? `
        <div class="crypto-address-box">
          <div class="crypto-address-label">
            <i class="fas fa-wallet"></i>
            <span>Send payment to this address:</span>
          </div>
          <div class="crypto-address-container">
            <input 
              type="text" 
              id="crypto-address-input" 
              class="crypto-address-input" 
              value="${cryptoPaymentData.payAddress}" 
              readonly
            />
            <button class="copy-btn" id="copy-address-btn" title="Copy address">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>

        ${qrCodeUrl ? `
          <div class="crypto-qr-box">
            <div class="crypto-qr-label">Scan QR code to pay</div>
            <div class="crypto-qr-container">
              <img src="${qrCodeUrl}" alt="Payment QR Code" class="crypto-qr-code" />
            </div>
          </div>
        ` : ''}
      ` : `
        <div class="crypto-payment-info">
          <i class="fas fa-info-circle"></i>
          <p>Payment details are being generated. Please wait...</p>
        </div>
      `}

      <div class="crypto-payment-info">
        <i class="fas fa-clock"></i>
        <p><strong>Important:</strong> This payment will expire within 20 minutes. Please complete the payment before it expires.</p>
      </div>

      <div class="crypto-actions">
        ${hasPaymentDetails ? `
          <button class="crypto-action-btn secondary" id="check-payment-status-btn">
            <i class="fas fa-sync-alt"></i> Check Status
          </button>
        ` : `
          <button class="crypto-action-btn primary" id="open-payment-page-btn">
            <i class="fas fa-external-link-alt"></i> Open Payment Page
          </button>
          <button class="crypto-action-btn secondary" id="check-payment-status-btn">
            <i class="fas fa-sync-alt"></i> Check Status
          </button>
        `}
      </div>
    </div>
  `;

  // Attach event listeners
  const openBtn = document.getElementById('open-payment-page-btn');
  const checkBtn = document.getElementById('check-payment-status-btn');
  const copyBtn = document.getElementById('copy-address-btn');
  
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      window.open(cryptoPaymentData.paymentUrl, '_blank');
    });
  }
  
  if (checkBtn) {
    checkBtn.addEventListener('click', checkCryptoPaymentStatus);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', copyCryptoAddress);
  }
}

function copyCryptoAddress() {
  const addressInput = document.getElementById('crypto-address-input');
  addressInput.select();
  addressInput.setSelectionRange(0, 99999); // For mobile devices
  
  try {
    document.execCommand('copy');
    const copyBtn = document.getElementById('copy-address-btn');
    const originalHTML = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
    copyBtn.style.color = '#10b981';
    
    setTimeout(() => {
      copyBtn.innerHTML = originalHTML;
      copyBtn.style.color = '';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}

function startPaymentStatusPolling() {
  // Clear existing interval
  if (paymentStatusInterval) {
    clearInterval(paymentStatusInterval);
  }

  // Check status every 10 seconds
  paymentStatusInterval = setInterval(() => {
    checkCryptoPaymentStatus();
  }, 10000);

  // Initial check after 5 seconds
  setTimeout(checkCryptoPaymentStatus, 5000);
}

async function checkCryptoPaymentStatus() {
  if (!cryptoPaymentData) return;

  try {
    const authData = await getAuthData();
    if (!authData?.user?.id) return;

    const config = await getSupabaseConfig();
    const checkBtn = document.getElementById('check-payment-status-btn');
    if (checkBtn) {
      const originalHTML = checkBtn.innerHTML;
      checkBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
      checkBtn.disabled = true;
    }

    console.log(`[FreelancerBot-CheckCryptoPayment] config: ${JSON.stringify(config)}`);
    console.log(`[FreelancerBot-CheckCryptoPayment] authData: ${JSON.stringify(authData)}`);
    console.log(`[FreelancerBot-CheckCryptoPayment] cryptoPaymentData: ${JSON.stringify(cryptoPaymentData)}`);
    const response = await fetch(`${config.url}/functions/v1/check-crypto-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData?.session?.access_token || ''}`,
      },
      body: JSON.stringify({ 
        payment_id: cryptoPaymentData.paymentId, 
        order_id: cryptoPaymentData.orderId 
      })
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.error('check-crypto-payment function not found. Please deploy the edge function to Supabase.');
        throw new Error('Payment check service unavailable. Please contact support.');
      }
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.success) {
      cryptoPaymentData.status = data.status;

      // If payment is confirmed or finished, stop polling and show success only
      if (data.status === 'confirmed' || data.status === 'finished') {
        if (paymentStatusInterval) {
          clearInterval(paymentStatusInterval);
          paymentStatusInterval = null;
        }
        
        // Hide payment details section and show only success message
        hidePaymentDetailsAndShowSuccess();
        
        // Send message to background script about payment success
        sendPaymentSuccessToBackground(data);
      } else {
        // Update payment details if they're now available (only for pending/waiting status)
        if (data.payAddress && !cryptoPaymentData.payAddress) {
          cryptoPaymentData.payAddress = data.payAddress;
        }
        if (data.payAmount && !cryptoPaymentData.payAmount) {
          cryptoPaymentData.payAmount = data.payAmount;
        }
        if (data.payCurrency && !cryptoPaymentData.payCurrency) {
          cryptoPaymentData.payCurrency = data.payCurrency;
        }
        
        // Re-render payment details to show address/QR code if now available
        renderCryptoPaymentDetails();
        updatePaymentStatusUI(data.status);
      }
    } else {
      throw new Error(data.error || 'Failed to check payment status');
    }

    if (checkBtn) {
      checkBtn.disabled = false;
      checkBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Check Status';
    }
  } catch (error) {
    console.error('Error checking payment status:', error);
    const checkBtn = document.getElementById('check-payment-status-btn');
    if (checkBtn) {
      checkBtn.disabled = false;
      checkBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Check Status';
    }
    
    // Show error to user
    const errorEl = document.getElementById('error-message');
    if (errorEl) {
      errorEl.textContent = error.message || 'Failed to check payment status. Please try again.';
      errorEl.classList.add('show');
      setTimeout(() => errorEl.classList.remove('show'), 5000);
    }
  }
}

function hidePaymentDetailsAndShowSuccess() {
  // Hide the payment details section
  const paymentSection = document.getElementById('payment-section');
  if (paymentSection) {
    paymentSection.innerHTML = '';
  }
  
  // Show success message
  const successEl = document.getElementById('success-message');
  if (successEl) {
    successEl.textContent = 'Payment successful! Your membership has been updated.';
    successEl.classList.add('show');
  }
}

function sendPaymentSuccessToBackground(paymentData) {
  try {
    chrome.runtime.sendMessage({
      action: 'paymentSuccess',
      order_id: paymentData.order_id,
      payment_id: paymentData.payment_id,
      status: paymentData.status,
      plan: paymentData.plan,
      billing_cycle: paymentData.billing_cycle
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending payment success message to background:', chrome.runtime.lastError);
      }
    });
  } catch (error) {
    console.error('Error sending payment success message to background:', error);
  }
}

function updatePaymentStatusUI(status) {
  const statusHeader = document.querySelector('.payment-status-header');
  if (!statusHeader) return;

  const statusIndicator = statusHeader.querySelector('.status-indicator');
  if (!statusIndicator) return;

  statusIndicator.className = `status-indicator ${status}`;
  
  let statusText = 'Waiting for payment';
  let icon = 'fa-circle-notch fa-spin';
  
  switch (status) {
    case 'waiting':
    case 'pending':
      statusText = 'Waiting for payment';
      icon = 'fa-circle-notch fa-spin';
      break;
    case 'confirming':
      statusText = 'Confirming payment';
      icon = 'fa-clock fa-spin';
      break;
    case 'confirmed':
      statusText = 'Payment confirmed';
      icon = 'fa-check-circle';
      break;
    case 'finished':
      statusText = 'Payment completed';
      icon = 'fa-check-circle';
      break;
    case 'failed':
      statusText = 'Payment failed';
      icon = 'fa-times-circle';
      break;
  }

  statusIndicator.innerHTML = `<i class="fas ${icon}"></i><span>${statusText}</span>`;
}

async function getAuthData() {
  try {
    const auth = await storageService.get('auth');
    if (!auth) {
      console.warn('No auth data found in storage');
      return null;
    }
    return auth;
  } catch (error) {
    console.error('Error getting auth data:', error);
    return null;
  }
}

async function getSupabaseConfig() {
  return {
    url: 'https://zscjfgjmutddidwluami.supabase.co',
  };
}

// Handle Stripe redirect callback
const sessionId = urlParams.get('session_id');
if (sessionId) {
  verifyStripePayment(sessionId);
}

// Handle NowPayments redirect callback
const paymentId = urlParams.get('payment_id') || sessionStorage.getItem('crypto_payment_id');
const orderId = urlParams.get('order_id') || sessionStorage.getItem('crypto_order_id');
if (paymentId || orderId) {
  verifyCryptoPayment(paymentId, orderId);
  // Clean up session storage
  sessionStorage.removeItem('crypto_payment_id');
  sessionStorage.removeItem('crypto_order_id');
}

async function verifyStripePayment(sessionId) {
  try {
    const authData = await getAuthData();
    const config = await getSupabaseConfig();
    const response = await fetch(`${config.url}/functions/v1/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData?.session?.access_token || ''}`,
      },
      body: JSON.stringify({ sessionId, provider: 'stripe' })
    });

    const data = await response.json();
    if (data.success) {
      const successEl = document.getElementById('success-message');
      successEl.textContent = 'Payment successful! Your membership has been updated.';
      successEl.classList.add('show');
    }
  } catch (error) {
    console.error('Payment verification failed:', error);
  }
}

async function verifyCryptoPayment(paymentId, orderId) {
  try {
    const authData = await getAuthData();
    if (!authData?.user?.id) {
      return;
    }

    const config = await getSupabaseConfig();
    
    // Check payment status from backend
    const response = await fetch(`${config.url}/functions/v1/check-crypto-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData?.session?.access_token || ''}`,
      },
      body: JSON.stringify({ payment_id: paymentId, order_id: orderId })
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.error('check-crypto-payment function not found. Please deploy the edge function to Supabase.');
        return;
      }
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('Payment check failed:', errorData.error || `HTTP ${response.status}`);
      return;
    }

    const data = await response.json();
    if (data.success) {
      // Update crypto payment data if it exists
      if (cryptoPaymentData && (cryptoPaymentData.paymentId === paymentId || cryptoPaymentData.orderId === orderId)) {
        cryptoPaymentData.status = data.status;
      }

      if (data.status === 'confirmed' || data.status === 'finished') {
        // Hide payment details section and show only success message
        hidePaymentDetailsAndShowSuccess();
        
        // Send message to background script about payment success
        sendPaymentSuccessToBackground(data);
        
        // Stop polling if active
        if (paymentStatusInterval) {
          clearInterval(paymentStatusInterval);
          paymentStatusInterval = null;
        }
      } else if (data.status === 'waiting' || data.status === 'pending') {
        // Update UI for pending payments
        if (cryptoPaymentData) {
          updatePaymentStatusUI(data.status);
        }
        // If we have payment data, start polling
        if (cryptoPaymentData && !paymentStatusInterval) {
          startPaymentStatusPolling();
        }
      }
    }
  } catch (error) {
    console.error('Crypto payment verification failed:', error);
  }
}

// Initialize on page load - wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeUI);
} else {
  // DOM is already ready
  initializeUI();
}
