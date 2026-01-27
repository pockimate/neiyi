<template>
  <div style="background-color: #FAFAFA !important;">
    <TheNavbar />
    
    <!-- Breadcrumb -->
    <Breadcrumb :items="[{ label: 'Contact' }]" />
    
    <!-- Hero Section -->
    <section style="text-align: center; padding: 40px 16px 64px; background: linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%);">
      <h1 style="font-size: 48px; font-weight: 700; letter-spacing: 2px; margin-bottom: 16px; color: #2C2C2C; line-height: 1.2; font-family: 'Playfair Display', serif;">Get in Touch</h1>
      <p style="font-size: 18px; color: #666666; max-width: 600px; margin: 0 auto; line-height: 1.6;">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
    </section>

    <!-- Contact Form & Info -->
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Contact Form -->
          <div class="lg:col-span-2">
            <div class="glass-card rounded-2xl p-8 border border-gray-200">
              <h2 class="font-display text-3xl font-bold text-textPrimary mb-6">Send us a Message</h2>
              <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium mb-2 text-slate-700">First Name</label>
                    <input 
                      v-model="form.firstName"
                      type="text" 
                      required
                      class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2 text-slate-700">Last Name</label>
                    <input 
                      v-model="form.lastName"
                      type="text" 
                      required
                      class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-2 text-slate-700">Email</label>
                  <input 
                    v-model="form.email"
                    type="email" 
                    required
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="jane@example.com"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-2 text-slate-700">Subject</label>
                  <input 
                    v-model="form.subject"
                    type="text" 
                    required
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="How can we help?"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-2 text-slate-700">Message</label>
                  <textarea 
                    v-model="form.message"
                    required
                    rows="6"
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  style="
                    width: 100%;
                    background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
                    color: #FFFFFF;
                    font-weight: 600;
                    padding: 16px 32px;
                    font-size: 16px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border: none;
                    border-radius: 9999px;
                    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                  "
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
          <!-- Contact Info -->
          <div class="space-y-6">
            <div class="glass-card rounded-2xl p-6 border border-gray-200">
              <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 class="font-display text-xl font-semibold mb-2 text-textPrimary">Email Us</h3>
              <p class="text-slate-600 mb-2">support@intimateelegance.com</p>
              <p class="text-sm text-slate-500">We'll respond within 24 hours</p>
            </div>
            
            <div class="glass-card rounded-2xl p-6 border border-gray-200">
              <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <h3 class="font-display text-xl font-semibold mb-2 text-textPrimary">Call Us</h3>
              <p class="text-slate-600 mb-2">+1 (555) 123-4567</p>
              <p class="text-sm text-slate-500">Mon-Fri, 9am-6pm EST</p>
            </div>
            
            <div class="glass-card rounded-2xl p-6 border border-gray-200">
              <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3 class="font-display text-xl font-semibold mb-2 text-textPrimary">Visit Us</h3>
              <p class="text-slate-600 mb-2">123 Elegance Avenue<br/>New York, NY 10001</p>
              <p class="text-sm text-slate-500">By appointment only</p>
            </div>
            
            <div class="glass-card rounded-2xl p-6 border border-gray-200">
              <h3 class="font-display text-xl font-semibold mb-4 text-textPrimary">Follow Us</h3>
              <div class="flex gap-3">
                <a href="#" class="w-10 h-10 bg-primary/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-200 cursor-pointer group">
                  <svg class="w-5 h-5 text-primary group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 bg-primary/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-200 cursor-pointer group">
                  <svg class="w-5 h-5 text-primary group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 bg-primary/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-200 cursor-pointer group">
                  <svg class="w-5 h-5 text-primary group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 px-4" style="background: linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%);">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="font-display text-4xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
          <p class="text-slate-600">Quick answers to common questions</p>
        </div>
        
        <div class="space-y-4">
          <div class="glass-card rounded-2xl p-6 border border-gray-200">
            <h3 class="font-display text-xl font-semibold mb-2 text-textPrimary">What are your shipping times?</h3>
            <p class="text-slate-600">We ship within 1-2 business days. Delivery typically takes 3-5 business days for domestic orders.</p>
          </div>
          
          <div class="glass-card rounded-2xl p-6 border border-gray-200">
            <h3 class="font-display text-xl font-semibold mb-2 text-textPrimary">What is your return policy?</h3>
            <p class="text-slate-600">We offer a 30-day return policy for unworn items in original packaging. See our Returns page for details.</p>
          </div>
          
          <div class="glass-card rounded-2xl p-6 border border-gray-200">
            <h3 class="font-display text-xl font-semibold mb-2 text-textPrimary">Do you ship internationally?</h3>
            <p class="text-slate-600">Yes! We ship to most countries worldwide. International shipping times vary by location.</p>
          </div>
        </div>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = () => {
  alert('Thank you for your message! We\'ll get back to you soon.')
  // Reset form
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.subject = ''
  form.message = ''
}
</script>
