<template>
  <div style="background-color: #FAFAFA !important;">
    <TheNavbar />
    
    <!-- Breadcrumb -->
    <Breadcrumb :items="[{ label: 'About' }]" />
    
    <!-- Hero Section -->
    <PageHeader 
      title="Our Story" 
      subtitle="Where elegance meets desire, and confidence becomes your signature" 
    />

    <!-- Mission Section -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="font-display text-4xl font-bold text-primary mb-6">Our Mission</h2>
            <p class="text-slate-600 text-lg mb-6 leading-relaxed">
              We believe every woman deserves to feel beautiful, confident, and empowered. Our journey began with a simple mission: to create luxury lingerie that celebrates femininity in all its forms.
            </p>
            <p class="text-slate-600 text-lg mb-6 leading-relaxed">
              Each piece in our collection is thoughtfully designed and crafted with premium materials, ensuring both comfort and elegance. From delicate lace to sumptuous silk, we source only the finest fabrics to create lingerie that feels as good as it looks.
            </p>
            <p class="text-slate-600 text-lg leading-relaxed">
              We're not just selling lingerie �?we're celebrating confidence, self-love, and the beauty of being uniquely you.
            </p>
          </div>
          <div class="glass-card rounded-3xl p-12 border border-gray-200 text-center">
            <svg class="w-32 h-32 mx-auto text-primary/20 mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <p class="font-script text-3xl text-primary">Crafted with love</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 px-4" style="background: linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%);">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-display text-4xl md:text-5xl font-bold text-primary mb-4">Our Values</h2>
          <p class="text-slate-600 text-lg max-w-2xl mx-auto">The principles that guide everything we do</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ContentCard title="Quality First" title-size="md">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
              </svg>
            </div>
            <p class="text-slate-600 leading-relaxed text-center">We never compromise on materials or craftsmanship. Every piece is made to last.</p>
          </ContentCard>
          
          <ContentCard title="Privacy Matters" title-size="md">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <p class="text-slate-600 leading-relaxed text-center">Discreet packaging and secure checkout. Your privacy is our priority.</p>
          </ContentCard>
          
          <ContentCard title="Customer Love" title-size="md">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <p class="text-slate-600 leading-relaxed text-center">Your satisfaction is our success. We're here to help every step of the way.</p>
          </ContentCard>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="glass-card rounded-3xl p-12 border border-gray-200">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p class="font-display text-5xl font-bold text-primary mb-2">10K+</p>
              <p class="text-slate-600">Happy Customers</p>
            </div>
            <div>
              <p class="font-display text-5xl font-bold text-primary mb-2">500+</p>
              <p class="text-slate-600">Unique Designs</p>
            </div>
            <div>
              <p class="font-display text-5xl font-bold text-primary mb-2">98%</p>
              <p class="text-slate-600">Satisfaction Rate</p>
            </div>
            <div>
              <p class="font-display text-5xl font-bold text-primary mb-2">24/7</p>
              <p class="text-slate-600">Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4" style="background: linear-gradient(180deg, #FAFAFA 0%, #F0F0F0 100%);">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="font-display text-4xl md:text-5xl font-bold text-primary mb-6">Ready to Feel Confident?</h2>
        <p class="text-lg text-slate-600 mb-8">Explore our collection and find your perfect piece</p>
        <BaseButton 
          tag="NuxtLink"
          to="/products" 
          variant="primary"
          size="lg"
        >
          Shop Now
        </BaseButton>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
</script>
