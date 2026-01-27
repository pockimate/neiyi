<template>
  <div>
    <TheNavbar />
    
    <!-- Breadcrumb -->
    <Breadcrumb :items="[{ label: 'Terms of Service' }]" />
    
    <section class="page-header" style="padding-top: 40px;">
      <h1 class="page-title">Terms of Service</h1>
      <p class="page-subtitle">Last updated: January 2024</p>
    </section>

    <section class="py-12 px-4">
      <div class="max-w-4xl mx-auto space-y-8">
        <div class="glass-card rounded-2xl p-8 border border-pink-200">
          <h2 class="font-display text-2xl font-bold text-textPrimary mb-4">Agreement to Terms</h2>
          <p class="text-slate-600 leading-relaxed">
            By accessing and using Intimate Elegance's website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
          </p>
        </div>

        <div class="glass-card rounded-2xl p-8 border border-pink-200">
          <h2 class="font-display text-2xl font-bold text-textPrimary mb-4">Use License</h2>
          <p class="text-slate-600 mb-4">Permission is granted to temporarily access the materials on Intimate Elegance's website for personal, non-commercial use only. This license shall automatically terminate if you violate any of these restrictions.</p>
          <p class="text-slate-600 mb-4">Under this license you may not:</p>
          <ul class="space-y-2 text-slate-600 ml-4">
            <li>• Modify or copy the materials</li>
            <li>• Use the materials for commercial purposes</li>
            <li>• Attempt to reverse engineer any software</li>
            <li>• Remove any copyright or proprietary notations</li>
            <li>• Transfer the materials to another person</li>
          </ul>
        </div>

        <div class="glass-card rounded-2xl p-8 border border-pink-200">
          <h2 class="font-display text-2xl font-bold text-textPrimary mb-4">Product Information</h2>
          <p class="text-slate-600 mb-4">We strive to provide accurate product descriptions and images. However:</p>
          <ul class="space-y-2 text-slate-600">
            <li>• Colors may vary slightly due to screen settings</li>
            <li>• We reserve the right to correct errors in pricing or descriptions</li>
            <li>• Product availability is subject to change</li>
            <li>• We may limit quantities purchased per customer</li>
          </ul>
        </div>

        <div class="glass-card rounded-2xl p-8 border border-pink-200">
          <h2 class="font-display text-2xl font-bold text-textPrimary mb-4">Pricing and Payment</h2>
          <p class="text-slate-600 mb-4">All prices are in USD and subject to change without notice. We accept:</p>
          <ul class="space-y-2 text-slate-600 ml-4">
            <li>• Major credit cards (Visa, Mastercard, American Express)</li>
            <li>• PayPal</li>
            <li>• Other payment methods as displayed at checkout</li>
          </ul>
          <p class="text-slate-600 mt-4">Payment is due at the time of purchase. We reserve the right to refuse or cancel orders for any reason.</p>
        </div>

        <div class="glass-card rounded-2xl p-8 border border-pink-200">
          <h2 class="font-display text-2xl font-bold text-textPrimary mb-4">Shipping and Delivery</h2>
          <p class="text-slate-600 mb-4">We ship to addresses within the United States and internationally. Shipping times and costs vary by location and method selected.</p>
          <ul class="space-y-2 text-slate-600">
            <li>• Risk of loss passes to you upon delivery to the carrier</li>
            <li>• We are not responsible for delays caused by shipping carriers</li>
            <li>• International customers are responsible for customs fees</li>
          </ul>
        </div>

        <div class="glass-card rounded-2xl p-8 border border-pink-200">
          <h2 class="font-display text-2xl font-bold text-textPrimary mb-4">Returns and Refunds</h2>
          <p class="text-slate-600 mb-4">Please refer to our Returns Policy for detailed information. In summary:</p>
          <ul class="space-y-2 text-slate-600">
            <li>• 30-day return window for unworn items</li>
            <li>• Items must be in original condition with tags attached</li>
            <li>• Certain items are non-returnable for hygiene reasons</li>
            <li>• Refunds processed within 5-7 business days of receipt</li>
          </ul>
        </div>

        <div class="glass-card rounded-2xl p-8 border border-pink-200">
          <h2 class="font-display text-2xl font-bold text-textPrimary mb-4">Account Responsibilities</h2>
          <p class="text-slate-600 mb-4">If you create an account with us, you are responsible for:</p>
          <ul class="space-y-2 text-slate-600">
            <li>• Maintaining the confidentiality of your account information</li>
            <li>• All activities that occur under your account</li>
            <li>• Notifying us immediately of any unauthorized use</li>
            <li>• Providing accurate and current information</li>
          </ul>
        </div>

        <div class="glass-card rounded-2xl p-8 border border-pink-200">
          <h2 class="font-display text-2xl font-bold text-textPrimary mb-4">Prohibited Uses</h2>
          <p class="text-slate-600 mb-4">You may not use our website:</p>
          <ul class="space-y-2 text-slate-600">
            <li>• For any unlawful purpose</li>
            <li>• To solicit others to perform unlawful acts</li>
            <li>• To violate any international, federal, or state regulations</li>
            <li>• To infringe upon intellectual property rights</li>
            <li>• To harass, abuse, or harm another person</li>
            <li>• To submit false or misleading information</li>
            <li>• To upload viruses or malicious code</li>
            <li>• To interfere with the security of the website</li>
          </ul>
        </div>

        <div class="glass-card rounded-2xl p-8 border border-pink-200">
          <h2 class="font-display text-2xl font-bold text-textPrimary mb-4">Intellectual Property</h2>
          <p class="text-slate-600">All content on this website, including text, graphics, logos, images, and software, is the property of Intimate Elegance and protected by copyright and trademark laws. Unauthorized use is prohibited.</p>
        </div>

        <div class="glass-card rounded-2xl p-8 border border-pink-200">
          <h2 class="font-display text-2xl font-bold text-textPrimary mb-4">Disclaimer</h2>
          <p class="text-slate-600 mb-4">The materials on our website are provided "as is". We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation:</p>
          <ul class="space-y-2 text-slate-600">
            <li>• Implied warranties of merchantability</li>
            <li>• Fitness for a particular purpose</li>
            <li>• Non-infringement of intellectual property</li>
          </ul>
        </div>

        <div class="glass-card rounded-2xl p-8 border border-pink-200">
          <h2 class="font-display text-2xl font-bold text-textPrimary mb-4">Limitation of Liability</h2>
          <p class="text-slate-600">In no event shall Intimate Elegance or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use our website or products.</p>
        </div>

        <div class="glass-card rounded-2xl p-8 border border-pink-200">
          <h2 class="font-display text-2xl font-bold text-textPrimary mb-4">Governing Law</h2>
          <p class="text-slate-600">These terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.</p>
        </div>

        <div class="glass-card rounded-2xl p-8 border border-pink-200">
          <h2 class="font-display text-2xl font-bold text-textPrimary mb-4">Changes to Terms</h2>
          <p class="text-slate-600">We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following any changes constitutes acceptance of those changes.</p>
        </div>

        <div class="glass-card rounded-2xl p-8 border border-pink-200 bg-gradient-to-br from-pink-50 to-purple-50">
          <h2 class="font-display text-2xl font-bold text-textPrimary mb-4">Contact Information</h2>
          <p class="text-slate-600 mb-4">For questions about these Terms of Service, please contact us:</p>
          <div class="space-y-2 text-slate-600">
            <p><strong>Email:</strong> legal@intimateelegance.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Elegance Avenue, New York, NY 10001</p>
          </div>
        </div>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
</script>
