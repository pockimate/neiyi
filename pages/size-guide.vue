<template>
  <div>
    <TheNavbar />
    
    <!-- Hero Section -->
    <section class="page-header">
      <h1 class="page-title">Size Guide</h1>
      <p class="page-subtitle">Find your perfect fit with our comprehensive sizing guide</p>
    </section>

    <!-- Size Charts -->
    <section class="py-12 px-4">
      <div class="max-w-6xl mx-auto space-y-12">
        <!-- Bra Size Chart -->
        <div class="glass-card rounded-2xl p-8 border border-pink-200">
          <h2 class="font-display text-3xl font-bold text-textPrimary mb-6">Bra Sizing</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b-2 border-pink-200">
                  <th class="py-3 px-4 font-semibold text-textPrimary">Size</th>
                  <th class="py-3 px-4 font-semibold text-textPrimary">Band (inches)</th>
                  <th class="py-3 px-4 font-semibold text-textPrimary">Cup A</th>
                  <th class="py-3 px-4 font-semibold text-textPrimary">Cup B</th>
                  <th class="py-3 px-4 font-semibold text-textPrimary">Cup C</th>
                  <th class="py-3 px-4 font-semibold text-textPrimary">Cup D</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-pink-100">
                  <td class="py-3 px-4 font-medium">32</td>
                  <td class="py-3 px-4 text-slate-600">28-30</td>
                  <td class="py-3 px-4 text-slate-600">32-33</td>
                  <td class="py-3 px-4 text-slate-600">33-34</td>
                  <td class="py-3 px-4 text-slate-600">34-35</td>
                  <td class="py-3 px-4 text-slate-600">35-36</td>
                </tr>
                <tr class="border-b border-pink-100">
                  <td class="py-3 px-4 font-medium">34</td>
                  <td class="py-3 px-4 text-slate-600">30-32</td>
                  <td class="py-3 px-4 text-slate-600">34-35</td>
                  <td class="py-3 px-4 text-slate-600">35-36</td>
                  <td class="py-3 px-4 text-slate-600">36-37</td>
                  <td class="py-3 px-4 text-slate-600">37-38</td>
                </tr>
                <tr class="border-b border-pink-100">
                  <td class="py-3 px-4 font-medium">36</td>
                  <td class="py-3 px-4 text-slate-600">32-34</td>
                  <td class="py-3 px-4 text-slate-600">36-37</td>
                  <td class="py-3 px-4 text-slate-600">37-38</td>
                  <td class="py-3 px-4 text-slate-600">38-39</td>
                  <td class="py-3 px-4 text-slate-600">39-40</td>
                </tr>
                <tr class="border-b border-pink-100">
                  <td class="py-3 px-4 font-medium">38</td>
                  <td class="py-3 px-4 text-slate-600">34-36</td>
                  <td class="py-3 px-4 text-slate-600">38-39</td>
                  <td class="py-3 px-4 text-slate-600">39-40</td>
                  <td class="py-3 px-4 text-slate-600">40-41</td>
                  <td class="py-3 px-4 text-slate-600">41-42</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium">40</td>
                  <td class="py-3 px-4 text-slate-600">36-38</td>
                  <td class="py-3 px-4 text-slate-600">40-41</td>
                  <td class="py-3 px-4 text-slate-600">41-42</td>
                  <td class="py-3 px-4 text-slate-600">42-43</td>
                  <td class="py-3 px-4 text-slate-600">43-44</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- General Size Chart -->
        <div class="glass-card rounded-2xl p-8 border border-pink-200">
          <h2 class="font-display text-3xl font-bold text-textPrimary mb-6">General Sizing</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b-2 border-pink-200">
                  <th class="py-3 px-4 font-semibold text-textPrimary">Size</th>
                  <th class="py-3 px-4 font-semibold text-textPrimary">Bust (inches)</th>
                  <th class="py-3 px-4 font-semibold text-textPrimary">Waist (inches)</th>
                  <th class="py-3 px-4 font-semibold text-textPrimary">Hips (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-pink-100">
                  <td class="py-3 px-4 font-medium">XS</td>
                  <td class="py-3 px-4 text-slate-600">31-33</td>
                  <td class="py-3 px-4 text-slate-600">24-26</td>
                  <td class="py-3 px-4 text-slate-600">34-36</td>
                </tr>
                <tr class="border-b border-pink-100">
                  <td class="py-3 px-4 font-medium">S</td>
                  <td class="py-3 px-4 text-slate-600">33-35</td>
                  <td class="py-3 px-4 text-slate-600">26-28</td>
                  <td class="py-3 px-4 text-slate-600">36-38</td>
                </tr>
                <tr class="border-b border-pink-100">
                  <td class="py-3 px-4 font-medium">M</td>
                  <td class="py-3 px-4 text-slate-600">35-37</td>
                  <td class="py-3 px-4 text-slate-600">28-30</td>
                  <td class="py-3 px-4 text-slate-600">38-40</td>
                </tr>
                <tr class="border-b border-pink-100">
                  <td class="py-3 px-4 font-medium">L</td>
                  <td class="py-3 px-4 text-slate-600">37-39</td>
                  <td class="py-3 px-4 text-slate-600">30-32</td>
                  <td class="py-3 px-4 text-slate-600">40-42</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium">XL</td>
                  <td class="py-3 px-4 text-slate-600">39-42</td>
                  <td class="py-3 px-4 text-slate-600">32-35</td>
                  <td class="py-3 px-4 text-slate-600">42-45</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- How to Measure -->
        <div class="glass-card rounded-2xl p-8 border border-pink-200">
          <h2 class="font-display text-3xl font-bold text-textPrimary mb-6">How to Measure</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div>
              <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <span class="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 class="font-display text-xl font-semibold mb-2 text-textPrimary">Bust</h3>
              <p class="text-slate-600">Measure around the fullest part of your bust, keeping the tape parallel to the floor.</p>
            </div>
            <div>
              <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <span class="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 class="font-display text-xl font-semibold mb-2 text-textPrimary">Waist</h3>
              <p class="text-slate-600">Measure around your natural waistline, which is the narrowest part of your torso.</p>
            </div>
            <div>
              <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <span class="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 class="font-display text-xl font-semibold mb-2 text-textPrimary">Hips</h3>
              <p class="text-slate-600">Measure around the fullest part of your hips, approximately 8 inches below your waist.</p>
            </div>
          </div>
        </div>

        <!-- Tips -->
        <div class="glass-card rounded-2xl p-8 border border-pink-200 bg-gradient-to-br from-pink-50 to-purple-50">
          <h2 class="font-display text-2xl font-bold text-textPrimary mb-4">Fitting Tips</h2>
          <ul class="space-y-3">
            <li class="flex items-start">
              <svg class="w-6 h-6 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-slate-600">Use a soft measuring tape and keep it snug but not tight</span>
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-slate-600">Measure over your undergarments for the most accurate fit</span>
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-slate-600">If you're between sizes, we recommend sizing up for comfort</span>
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-slate-600">Still unsure? Contact our customer service team for personalized assistance</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 px-4 bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="font-display text-4xl font-bold text-primary mb-4">Need Help?</h2>
        <p class="text-lg text-slate-600 mb-8">Our customer service team is here to help you find the perfect fit</p>
        <NuxtLink to="/contact" class="inline-block bg-cta hover:bg-yellow-600 text-white px-10 py-5 rounded-full font-semibold transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl">
          Contact Us
        </NuxtLink>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
</script>
