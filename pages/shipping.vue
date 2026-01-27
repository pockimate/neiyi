<template>
  <div style="background-color: #FAFAFA !important;">
    <TheNavbar />
    
    <!-- Breadcrumb -->
    <Breadcrumb :items="[{ label: 'Shipping' }]" />
    
    <section style="text-align: center; padding: 40px 16px 64px; background: linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%);">
      <h1 style="font-size: 48px; font-weight: 700; letter-spacing: 2px; margin-bottom: 16px; color: #2C2C2C; line-height: 1.2; font-family: 'Playfair Display', serif;">Shipping Information</h1>
      <p style="font-size: 18px; color: #666666; max-width: 600px; margin: 0 auto; line-height: 1.6;">Fast, discreet, and reliable delivery to your door</p>
    </section>

    <section class="py-12 px-4">
      <div class="max-w-6xl mx-auto space-y-8">
        <div class="glass-card rounded-2xl p-8 border border-gray-200">
          <h2 class="font-display text-3xl font-bold text-textPrimary mb-6">Shipping Options</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="border border-gray-200 rounded-xl p-6">
              <h3 class="font-display text-xl font-semibold mb-2 text-textPrimary">Standard Shipping</h3>
              <p class="text-3xl font-bold text-primary mb-2">$5.99</p>
              <p class="text-slate-600 mb-4">5-7 business days</p>
              <p class="text-sm text-slate-500">Free on orders over $100</p>
            </div>
            <div class="border border-gray-200 rounded-xl p-6 bg-gray-50">
              <div class="inline-block bg-cta text-white px-3 py-1 rounded-full text-xs font-semibold mb-2">POPULAR</div>
              <h3 class="font-display text-xl font-semibold mb-2 text-textPrimary">Express Shipping</h3>
              <p class="text-3xl font-bold text-primary mb-2">$12.99</p>
              <p class="text-slate-600 mb-4">2-3 business days</p>
              <p class="text-sm text-slate-500">Expedited processing</p>
            </div>
            <div class="border border-gray-200 rounded-xl p-6">
              <h3 class="font-display text-xl font-semibold mb-2 text-textPrimary">Overnight</h3>
              <p class="text-3xl font-bold text-primary mb-2">$24.99</p>
              <p class="text-slate-600 mb-4">1 business day</p>
              <p class="text-sm text-slate-500">Next day delivery</p>
            </div>
          </div>
        </div>

        <div class="glass-card rounded-2xl p-8 border border-gray-200">
          <h2 class="font-display text-3xl font-bold text-textPrimary mb-6">Processing Time</h2>
          <p class="text-slate-600 text-lg mb-4">Orders are processed within 1-2 business days (Monday-Friday, excluding holidays).</p>
          <p class="text-slate-600">You will receive a confirmation email with tracking information once your order ships.</p>
        </div>

        <div class="glass-card rounded-2xl p-8 border border-gray-200">
          <h2 class="font-display text-3xl font-bold text-textPrimary mb-6">International Shipping</h2>
          <p class="text-slate-600 text-lg mb-4">We ship to over 50 countries worldwide!</p>
          <ul class="space-y-3">
            <li class="flex items-start">
              <svg class="w-6 h-6 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-slate-600">Shipping rates calculated at checkout based on destination</span>
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-slate-600">Delivery time: 7-14 business days for most countries</span>
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-slate-600">Customs fees and import duties are the responsibility of the customer</span>
            </li>
          </ul>
        </div>

        <div class="glass-card rounded-2xl p-8 border border-gray-200 bg-gray-50">
          <h2 class="font-display text-3xl font-bold text-textPrimary mb-6">Discreet Packaging</h2>
          <p class="text-slate-600 text-lg mb-4">Your privacy is our priority. All orders are shipped in:</p>
          <ul class="space-y-3">
            <li class="flex items-start">
              <svg class="w-6 h-6 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-slate-600">Plain, unmarked packaging with no branding</span>
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-slate-600">Generic return address</span>
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-slate-600">Secure, tamper-proof sealing</span>
            </li>
          </ul>
        </div>

        <div class="glass-card rounded-2xl p-8 border border-gray-200">
          <h2 class="font-display text-3xl font-bold text-textPrimary mb-6">Order Tracking</h2>
          <p class="text-slate-600 text-lg mb-4">Track your order every step of the way:</p>
          <div class="grid md:grid-cols-4 gap-4">
            <div class="text-center">
              <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span class="text-2xl font-bold text-primary">1</span>
              </div>
              <p class="font-semibold text-textPrimary mb-1">Order Placed</p>
              <p class="text-sm text-slate-500">Confirmation email sent</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span class="text-2xl font-bold text-primary">2</span>
              </div>
              <p class="font-semibold text-textPrimary mb-1">Processing</p>
              <p class="text-sm text-slate-500">1-2 business days</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span class="text-2xl font-bold text-primary">3</span>
              </div>
              <p class="font-semibold text-textPrimary mb-1">Shipped</p>
              <p class="text-sm text-slate-500">Tracking number provided</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span class="text-2xl font-bold text-primary">4</span>
              </div>
              <p class="font-semibold text-textPrimary mb-1">Delivered</p>
              <p class="text-sm text-slate-500">Enjoy your purchase!</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 px-4" style="background: linear-gradient(135deg, #F5F5F5 0%, #E8E8E8 100%);">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="font-display text-4xl font-bold mb-4" style="color: #2C2C2C;">Questions About Shipping?</h2>
        <p class="text-lg text-slate-600 mb-8">Our customer service team is here to help</p>
        <NuxtLink 
          to="/contact" 
          style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
            color: #FFFFFF;
            font-weight: 600;
            padding: 18px 40px;
            font-size: 18px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: none;
            border-radius: 9999px;
            box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            text-decoration: none;
          "
        >
          Contact Us
        </NuxtLink>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
</script>

