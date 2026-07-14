<template>
  <div class="min-h-screen bg-primary-900/90 pb-20 md:pb-0 pt-[110px]">
    <TheNavbar />

    <!-- Shopify 风格信任徽章三件套（Fast Shipping / 30-Day Guarantee / Secure Checkout）-->
    <!-- 普通文档流定位：紧贴 nav 下方、main 之上 -->
    <div class="bg-[#FFE5B4] text-primary-900 border-b border-amber-200">
      <div class="max-w-7xl mx-auto px-4 md:px-6 py-2.5 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-[12px] md:text-[13px] font-semibold tracking-wide">
        <div class="flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <span class="uppercase">Fast Shipping</span>
        </div>
        <div class="w-px h-3 bg-amber-300/50"></div>
        <div class="flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          <span class="uppercase">30-Day Guarantee</span>
        </div>
        <div class="w-px h-3 bg-amber-300/50"></div>
        <div class="flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          <span class="uppercase">Secure Checkout</span>
        </div>
      </div>
    </div>

    <main class="pt-6 md:pt-8 pb-20 px-4 md:px-6">
      <div class="max-w-7xl mx-auto">
        <!-- Empty Cart -->
        <div v-if="cartStore.items.length === 0" class="text-center py-20">
          <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-800 flex items-center justify-center">
            <svg class="w-10 h-10 text-cream-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
          </div>
          <h3 class="text-xl font-light mb-2 text-cream-100 uppercase tracking-wide">Your Cart is Empty</h3>
          <p class="text-sm text-cream-300 mb-8">Looks like you haven't added anything yet.</p>
          <NuxtLink to="/products" class="inline-block px-8 py-3 bg-accent-500 hover:bg-accent-400 text-white font-semibold text-sm uppercase tracking-wider rounded-lg transition shadow-lg shadow-accent-500/30">
            Browse Collection
          </NuxtLink>
        </div>

        <!-- ====== Checkout Grid ====== -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 md:gap-10">
          <!-- ====== LEFT: Main Form ====== -->
          <div class="space-y-6">
            <form @submit.prevent="handleSubmit">

              <!-- ====== 1. Express Checkout (PayPal SDK 动态渲染可用的 funding sources，自动居中) ====== -->
              <!-- 用 v-if 整段控制：避免 v-show 切换触发 Vue 重渲染清掉 PayPal SDK 注入的 iframe -->
              <template v-if="paypalSdkReady">
                <section
                  v-if="hasExpressCheckout"
                  aria-labelledby="express-heading"
                  class="space-y-2"
                >
                  <p id="express-heading" class="text-sm text-center text-cream-300">Express checkout</p>
                  <div class="flex flex-wrap justify-center gap-2.5">
                    <!-- PayPal 总是显示（全球可用） -->
                    <div
                      v-show="availableFunding.paypal"
                      id="paypal-btn-paypal"
                      class="express-pay-btn h-12 rounded-2xl overflow-hidden flex-1 max-w-[220px] min-w-[140px]"
                    />
                    <!-- Apple Pay 仅 Apple 设备 + 域名验证后显示 -->
                    <div
                      v-show="availableFunding.applepay"
                      id="paypal-btn-applepay"
                      class="express-pay-btn h-12 rounded-2xl overflow-hidden flex-1 max-w-[220px] min-w-[140px]"
                    />
                    <!-- Google Pay 需浏览器/设备支持且商户已开通 -->
                    <div
                      v-show="availableFunding.googlepay"
                      id="paypal-btn-googlepay"
                      class="express-pay-btn h-12 rounded-2xl overflow-hidden flex-1 max-w-[220px] min-w-[140px]"
                    />
                  </div>
                  <p v-if="paypalError" class="text-xs text-amber-400 text-center">{{ paypalError }}</p>
                  <p v-if="walletSandboxNote" class="text-[11px] text-center text-cream-300/70">
                    {{ walletSandboxNote }}
                  </p>
                </section>

                <!-- ====== OR Divider（仅在 Express checkout 存在时显示） ====== -->
                <div
                  v-if="hasExpressCheckout"
                  class="flex items-center gap-4"
                >
                  <div class="flex-1 h-px bg-border" />
                  <span class="text-sm text-cream-300 font-medium">OR</span>
                  <div class="flex-1 h-px bg-border" />
                </div>
              </template>

              <!-- ====== 2. Contact ====== -->
              <section class="border border-border rounded-xl overflow-hidden">
                <div class="px-5 py-4 border-b border-border flex items-center justify-between">
                  <h2 class="text-sm font-semibold text-cream-100">Contact</h2>
                  <NuxtLink to="/login" class="text-xs text-primary-900 hover:text-accent-600 transition font-semibold underline underline-offset-2">Sign in</NuxtLink>
                </div>
                <div class="p-5 space-y-3">
                  <div>
                    <label class="block text-[13px] font-medium text-cream-200 mb-1.5">Email</label>
                    <input
                      v-model="form.email"
                      type="email"
                      data-field="email"
                      @blur="validateField('email')"
                      @focus="focusedField = 'email'"
                      :class="[
                        'w-full px-4 py-3 bg-primary-900/60 border-2 rounded-lg text-sm text-cream-100 placeholder-cream-300/40 focus:outline-none transition-all',
                        errors.email
                          ? 'border-red-500/60'
                          : focusedField === 'email'
                          ? 'border-accent-500 shadow-[0_0_0_2px_rgba(255,27,107,0.15)]'
                          : 'border-accent-500/20 hover:border-accent-500/30'
                      ]"
                      placeholder="Email"
                      autocomplete="email"
                    />
                    <p v-if="errors.email" class="text-red-400 text-xs mt-1.5">{{ errors.email }}</p>
                  </div>
                  <div class="flex items-start gap-3 p-3 bg-accent-500/5 border border-accent-500/10 rounded-lg">
                    <input v-model="form.newsletter" id="newsletter" type="checkbox" class="mt-0.5 w-4 h-4 rounded accent-accent-500" />
                    <label for="newsletter" class="text-xs text-cream-200 leading-relaxed cursor-pointer">
                      Email me with news and exclusive offers
                    </label>
                  </div>
                </div>
              </section>

              <!-- ====== 3. Shipping Address ====== -->
              <section class="border border-border rounded-xl overflow-hidden">
                <div class="px-5 py-4 border-b border-border">
                  <h2 class="text-sm font-semibold text-cream-100">Shipping Address</h2>
                </div>
                <div class="p-5 space-y-4">
                  <!-- Country -->
                  <div>
                    <label class="block text-[13px] font-medium text-cream-200 mb-1.5">Country/Region</label>
                    <select
                      v-model="form.country"
                      data-field="country"
                      @change="validateField('country')"
                      @blur="validateField('country')"
                      @focus="focusedField = 'country'"
                      :class="selectClass('country')"
                      autocomplete="country"
                    >
                      <option value="">Select country/region</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="IT">Italy</option>
                      <option value="ES">Spain</option>
                      <option value="NL">Netherlands</option>
                      <option value="JP">Japan</option>
                      <option value="KR">South Korea</option>
                      <option value="SG">Singapore</option>
                      <option value="HK">Hong Kong, China</option>
                      <option value="TW">Taiwan, China</option>
                      <option value="CN">China</option>
                    </select>
                    <p v-if="errors.country" class="text-red-400 text-xs mt-1.5">{{ errors.country }}</p>
                  </div>

                  <!-- First + Last Name -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-[13px] font-medium text-cream-200 mb-1.5">First name</label>
                      <input
                        v-model="form.firstName"
                        type="text"
                        data-field="firstName"
                        :class="inputClass('firstName')"
                        placeholder="First name"
                        autocomplete="given-name"
                        @blur="validateField('firstName')"
                        @focus="focusedField = 'firstName'"
                      />
                      <p v-if="errors.firstName" class="text-red-400 text-xs mt-1.5">{{ errors.firstName }}</p>
                    </div>
                    <div>
                      <label class="block text-[13px] font-medium text-cream-200 mb-1.5">Last name</label>
                      <input
                        v-model="form.lastName"
                        type="text"
                        data-field="lastName"
                        :class="inputClass('lastName')"
                        placeholder="Last name"
                        autocomplete="family-name"
                        @blur="validateField('lastName')"
                        @focus="focusedField = 'lastName'"
                      />
                      <p v-if="errors.lastName" class="text-red-400 text-xs mt-1.5">{{ errors.lastName }}</p>
                    </div>
                  </div>

                  <!-- Address -->
                  <div>
                    <label class="block text-[13px] font-medium text-cream-200 mb-1.5">Address</label>
                    <input
                      v-model="form.address"
                      type="text"
                      data-field="address"
                      :class="inputClass('address')"
                      placeholder="Address"
                      autocomplete="street-address"
                      @blur="validateField('address')"
                      @focus="focusedField = 'address'"
                    />
                    <p v-if="errors.address" class="text-red-400 text-xs mt-1.5">{{ errors.address }}</p>
                  </div>

                  <!-- Apartment -->
                  <div>
                    <label class="block text-[13px] font-medium text-cream-200 mb-1.5">Apartment, suite, etc. (optional)</label>
                    <input
                      v-model="form.address2"
                      type="text"
                      :class="inputClass()"
                      placeholder="Apartment, suite, unit, building, floor, etc."
                      autocomplete="address-line2"
                      @focus="focusedField = 'address2'"
                    />
                  </div>

                  <!-- City / State / ZIP -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label class="block text-[13px] font-medium text-cream-200 mb-1.5">City</label>
                      <input
                        v-model="form.city"
                        type="text"
                        data-field="city"
                        :class="inputClass('city')"
                        placeholder="City"
                        autocomplete="address-level2"
                        @blur="validateField('city')"
                        @focus="focusedField = 'city'"
                      />
                      <p v-if="errors.city" class="text-red-400 text-xs mt-1.5">{{ errors.city }}</p>
                    </div>
                    <div>
                      <label class="block text-[13px] font-medium text-cream-200 mb-1.5">State</label>
                      <input
                        v-model="form.state"
                        type="text"
                        data-field="state"
                        :class="inputClass('state')"
                        placeholder="State"
                        autocomplete="address-level1"
                        @blur="validateField('state')"
                        @focus="focusedField = 'state'"
                      />
                      <p v-if="errors.state" class="text-red-400 text-xs mt-1.5">{{ errors.state }}</p>
                    </div>
                    <div>
                      <label class="block text-[13px] font-medium text-cream-200 mb-1.5">ZIP code</label>
                      <input
                        v-model="form.zipCode"
                        type="text"
                        data-field="zipCode"
                        @blur="validateField('zipCode')"
                        :class="inputClass('zipCode', errors.zipCode)"
                        placeholder="ZIP code"
                        autocomplete="postal-code"
                        @focus="focusedField = 'zipCode'"
                      />
                      <p v-if="errors.zipCode" class="text-red-400 text-xs mt-1.5">{{ errors.zipCode }}</p>
                    </div>
                  </div>

                  <!-- Phone -->
                  <div>
                    <label class="block text-[13px] font-medium text-cream-200 mb-1.5">Phone (optional)</label>
                    <input
                      v-model="form.phone"
                      type="tel"
                      :class="inputClass()"
                      placeholder="Phone"
                      autocomplete="tel"
                      @focus="focusedField = 'phone'"
                    />
                  </div>
                </div>
              </section>

              <!-- ====== 4. Shipping Method ====== -->
              <section class="border border-border rounded-xl overflow-hidden">
                <div class="px-5 py-4 border-b border-border">
                  <h2 class="text-sm font-semibold text-cream-100">Shipping Method</h2>
                </div>
                <div class="p-5 space-y-2.5">
                  <label
                    v-for="method in shippingMethods"
                    :key="method.id"
                    :data-field="form.shippingMethod === method.id ? 'shippingMethod' : undefined"
                    @click="form.shippingMethod = method.id"
                    :class="[
                      'flex items-center justify-between p-3.5 border-2 rounded-lg cursor-pointer transition-all duration-200',
                      form.shippingMethod === method.id
                        ? 'border-accent-500 bg-accent-500/5 shadow-sm'
                        : 'border-accent-500/20 hover:border-accent-500/40 bg-primary-900/40'
                    ]"
                  >
                    <input
                      v-model="form.shippingMethod"
                      type="radio"
                      name="shippingMethod"
                      :value="method.id"
                      class="sr-only"
                    />
                    <div class="flex items-center gap-3">
                      <div :class="[
                        'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
                        form.shippingMethod === method.id ? 'border-accent-500' : 'border-accent-500/30'
                      ]">
                        <div v-if="form.shippingMethod === method.id" class="w-2 h-2 rounded-full bg-accent-500" />
                      </div>
                      <div>
                        <p class="text-sm font-medium text-cream-100">{{ method.label }}</p>
                        <p class="text-xs text-cream-300 mt-0.5">{{ method.description }}</p>
                      </div>
                    </div>
                    <span :class="method.price === 0 ? 'text-success-400' : 'text-cream-100'" class="text-sm font-bold whitespace-nowrap">
                      {{ method.price === 0 ? 'Free' : '$' + method.price.toFixed(2) }}
                    </span>
                  </label>
                </div>
              </section>

              <!-- ====== 5. Payment (Shopify 风格：Credit Card + PayPal 双选) ====== -->
              <section class="border border-border rounded-xl overflow-hidden">
                <div class="px-5 py-4 border-b border-border flex items-center justify-between">
                  <h2 class="text-sm font-semibold text-cream-100">Payment</h2>
                  <span class="text-[10px] text-success-500 font-semibold uppercase tracking-wider flex items-center gap-1">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                    SSL Encrypted
                  </span>
                </div>
                <div class="p-5 space-y-3">
                  <!-- ========== Payment Method Switcher (Shopify 风格) ========== -->
                  <div class="space-y-2.5">
                    <!-- Credit Card 选项 -->
                    <label
                      class="flex flex-wrap sm:flex-nowrap items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all"
                      @click="form.paymentMethod = 'card'"
                      data-field="paymentMethod"
                      :class="form.paymentMethod === 'card'
                        ? 'border-accent-500 bg-accent-500/5'
                        : 'border-border bg-primary-800/40 hover:border-accent-500/40'"
                    >
                      <input
                        v-model="form.paymentMethod"
                        type="radio"
                        value="card"
                        class="sr-only"
                      />
                      <!-- 自定义 radio -->
                      <div
                        class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                        :class="form.paymentMethod === 'card' ? 'border-accent-500' : 'border-cream-300/40'"
                      >
                        <div
                          class="w-2.5 h-2.5 rounded-full transition-all"
                          :class="form.paymentMethod === 'card' ? 'bg-accent-500 scale-100' : 'scale-0'"
                        ></div>
                      </div>
                      <!-- 信用卡图标 -->
                      <div class="flex items-center gap-1.5 flex-1 min-w-0">
                        <svg class="w-7 h-5 text-cream-200" viewBox="0 0 24 16" fill="none" stroke="currentColor" stroke-width="1.5">
                          <rect x="1" y="1" width="22" height="14" rx="2"/>
                          <line x1="1" y1="5" x2="23" y2="5"/>
                          <line x1="5" y1="11" x2="9" y2="11"/>
                        </svg>
                        <span class="text-sm font-semibold text-cream-100">Credit Card</span>
                      </div>
                      <!-- 接受卡品牌 -->
                      <div class="hidden sm:flex items-center gap-1">
                        <span class="text-[10px] font-bold text-cream-300 bg-primary-900/80 px-1.5 py-0.5 rounded">VISA</span>
                        <span class="text-[10px] font-bold text-cream-300 bg-primary-900/80 px-1.5 py-0.5 rounded">MC</span>
                        <span class="text-[10px] font-bold text-cream-300 bg-primary-900/80 px-1.5 py-0.5 rounded">AMEX</span>
                      </div>
                    </label>

                    <!-- Credit Card 展开字段（仅当选中） -->
                    <div v-if="form.paymentMethod === 'card'" class="pl-0 sm:pl-8 space-y-3 pt-1">
                      <div>
                        <label class="block text-[12px] font-medium text-cream-200 mb-1.5">Card number</label>
                        <div
                          v-if="shouldRenderHostedCardFieldContainers"
                          id="card-number-field"
                          data-field="cardNumber"
                          :class="cardFieldClass('cardNumber')"
                        ></div>
                        <div v-else class="space-y-2">
                          <div class="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs leading-relaxed">
                            {{ cardFieldsNotice || 'Advanced card payments are not available for this PayPal configuration yet. Please use PayPal while we finish your card setup.' }}
                          </div>
                          <input
                            v-model="form.cardNumber"
                            type="text"
                            inputmode="numeric"
                            placeholder="1234 1234 1234 1234"
                            maxlength="19"
                            @input="formatCardNumber"
                            :class="inputClass('cardNumber', errors.cardNumber)"
                          />
                        </div>
                        <p v-if="errors.cardNumber" class="text-red-400 text-xs mt-1">{{ errors.cardNumber }}</p>
                      </div>
                      <div>
                        <label class="block text-[12px] font-medium text-cream-200 mb-1.5">Cardholder name</label>
                        <input
                          v-model="form.cardName"
                          type="text"
                          placeholder="Name as it appears on card"
                          :class="inputClass('cardName', errors.cardName)"
                        />
                        <p v-if="errors.cardName" class="text-red-400 text-xs mt-1">{{ errors.cardName }}</p>
                      </div>
                      <div class="grid grid-cols-2 gap-3">
                        <div>
                          <label class="block text-[12px] font-medium text-cream-200 mb-1.5">Expiration (MM/YY)</label>
                          <div
                            v-if="shouldRenderHostedCardFieldContainers"
                            id="card-expiry-field"
                            data-field="cardExpiry"
                            :class="cardFieldClass('cardExpiry')"
                          ></div>
                          <input
                            v-else
                            v-model="form.cardExpiry"
                            type="text"
                            inputmode="numeric"
                            placeholder="MM/YY"
                            maxlength="5"
                            @input="formatCardExpiry"
                            :class="inputClass('cardExpiry', errors.cardExpiry)"
                          />
                          <p v-if="errors.cardExpiry" class="text-red-400 text-xs mt-1">{{ errors.cardExpiry }}</p>
                        </div>
                        <div>
                          <label class="block text-[12px] font-medium text-cream-200 mb-1.5">Security code</label>
                          <div
                            v-if="shouldRenderHostedCardFieldContainers"
                            id="card-cvv-field"
                            data-field="cardCvv"
                            :class="cardFieldClass('cardCvv')"
                          ></div>
                          <div v-else class="relative">
                            <input
                              v-model="form.cardCvv"
                              type="text"
                              inputmode="numeric"
                              placeholder="CVV"
                              maxlength="4"
                              @input="form.cardCvv = form.cardCvv.replace(/\\D/g, '')"
                              :class="inputClass('cardCvv', errors.cardCvv)"
                            />
                            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                            </svg>
                          </div>
                          <p v-if="errors.cardCvv" class="text-red-400 text-xs mt-1">{{ errors.cardCvv }}</p>
                        </div>
                      </div>
                      <p v-if="paymentMethodHint" class="text-[11px] text-cream-300">
                        {{ paymentMethodHint }}
                      </p>
                    </div>

                    <!-- PayPal 选项 -->
                    <label
                      class="flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all"
                      @click="form.paymentMethod = 'paypal'"
                      data-field="paymentMethod"
                      :class="form.paymentMethod === 'paypal'
                        ? 'border-accent-500 bg-accent-500/5'
                        : 'border-border bg-primary-800/40 hover:border-accent-500/40'"
                    >
                      <input
                        v-model="form.paymentMethod"
                        type="radio"
                        value="paypal"
                        class="sr-only"
                      />
                      <div
                        class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                        :class="form.paymentMethod === 'paypal' ? 'border-accent-500' : 'border-cream-300/40'"
                      >
                        <div
                          class="w-2.5 h-2.5 rounded-full transition-all"
                          :class="form.paymentMethod === 'paypal' ? 'bg-accent-500 scale-100' : 'scale-0'"
                        ></div>
                      </div>
                      <div class="flex items-center gap-2 flex-1">
                        <span class="text-sm font-bold italic text-cream-100" style="color: #003087;">Pay</span><span class="text-sm font-bold italic text-accent-500" style="color: #009cde;">Pal</span>
                        <span class="text-sm font-semibold text-cream-100 ml-1">PayPal</span>
                      </div>
                      <svg class="w-3 h-3 text-cream-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </label>

                    <!-- PayPal 提示（仅当选中） -->
                    <div v-if="form.paymentMethod === 'paypal'" class="pl-0 sm:pl-8 pt-1">
                      <p class="text-xs text-cream-300 leading-relaxed">
                        We'll securely process your PayPal checkout and confirm your order right away.
                      </p>
                      <p v-if="paymentMethodHint" class="text-[11px] text-cream-300 mt-1.5 leading-relaxed">
                        {{ paymentMethodHint }}
                      </p>
                    </div>
                  </div>

                  <!-- ========== Gift Wrap ========== -->
                  <label class="flex items-start gap-3 p-3 rounded-lg bg-primary-800/40 border border-border cursor-pointer hover:bg-primary-800/60 transition mt-4">
                    <input v-model="form.giftWrap" type="checkbox" class="mt-0.5 w-4 h-4 rounded accent-accent-500" />
                    <div>
                      <p class="text-sm font-medium text-cream-100">🎁 Gift Wrap <span class="text-xs text-cream-300 font-normal">· $5.00</span></p>
                      <p class="text-xs text-cream-300 mt-0.5">Discreet, elegant packaging — perfect for surprises</p>
                    </div>
                  </label>

                  <!-- ========== Terms ========== -->
                  <label data-field="terms" class="flex items-start gap-3 p-3 rounded-lg cursor-pointer"
                    :class="errors.terms ? 'bg-red-500/5 border border-red-500/30' : 'bg-primary-800/40 border border-border hover:bg-primary-800/60 transition'">
                    <input v-model="form.terms" type="checkbox" @change="errors.terms = ''" class="mt-0.5 w-4 h-4 rounded accent-accent-500" />
                    <span class="text-xs text-cream-200 leading-relaxed">
                      I agree to the
                      <NuxtLink to="/terms" target="_blank" class="text-accent-400 hover:underline font-medium">Terms of Service</NuxtLink>,
                      <NuxtLink to="/privacy" target="_blank" class="text-accent-400 hover:underline font-medium">Privacy Policy</NuxtLink>,
                      and <NuxtLink to="/returns" target="_blank" class="text-accent-400 hover:underline font-medium">Return Policy</NuxtLink>.
                    </span>
                  </label>
                  <p v-if="errors.terms" class="text-red-400 text-xs ml-4 -mt-2">{{ errors.terms }}</p>

                  <!-- ========== Submit Button（根据 paymentMethod 切换） ========== -->
                  <div class="pt-1">
                    <!-- PayPal 提交按钮 -->
                    <button
                      v-if="form.paymentMethod === 'paypal'"
                      type="submit"
                      :disabled="isSubmitting || !canSubmitManual"
                      class="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FFC439] to-[#FFB100] hover:from-[#FFB100] hover:to-[#FFC439] text-[#172C70] font-bold text-sm uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
                    >
                      <svg v-if="isSubmitting" class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
                      </svg>
                      <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="#172C70">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
                      </svg>
                      <span v-if="!isSubmitting">PayPal · ${{ finalTotal.toFixed(2) }}</span>
                      <span v-else>Redirecting to PayPal…</span>
                    </button>

                    <!-- Credit Card 提交按钮 -->
                    <button
                      v-else
                      type="submit"
                      :disabled="isSubmitting || !canSubmitCard"
                      class="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-500 to-accent-400 hover:from-accent-400 hover:to-accent-500 text-white font-bold text-sm uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-accent-500/20 flex items-center justify-center gap-2"
                    >
                      <svg v-if="isSubmitting" class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
                      </svg>
                      <span v-if="!isSubmitting">Pay with card · ${{ finalTotal.toFixed(2) }}</span>
                      <span v-else>Processing…</span>
                    </button>
                  </div>

                  <!-- Footer 信任徽章 -->
                  <p class="text-[10px] text-cream-300/60 text-center pt-1">
                    🔒 Your payment is encrypted and securely processed
                  </p>
                </div>
              </section>
            </form>
          </div>

          <!-- ====== RIGHT: Order Summary Sidebar (LUNA 暗色风格) ====== -->
          <div>
            <aside class="glass-card lg:sticky lg:top-20 rounded-2xl overflow-hidden">
              <!-- Items List -->
              <div class="px-5 py-4 space-y-3 max-h-[340px] overflow-y-auto custom-scrollbar">
                <div v-for="(item, idx) in cartStore.items" :key="idx" class="flex gap-3">
                  <!-- Product image with quantity badge -->
                  <div class="relative flex-shrink-0">
                    <div class="w-[68px] h-[68px] rounded-lg overflow-hidden bg-primary-950/60 ring-1 ring-accent-500/10">
                      <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover" loading="lazy" />
                      <div v-else class="w-full h-full flex items-center justify-center text-cream-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      </div>
                    </div>
                    <span class="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 bg-accent-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold px-1 shadow-md z-10">
                      {{ item.quantity ?? 1 }}
                    </span>
                  </div>
                  <!-- Details -->
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-cream-100 leading-snug mb-0.5">{{ item.name }}</p>
                    <p class="text-[11px] text-cream-300 mb-1">{{ item.size }}{{ item.color ? ' / ' + item.color : '' }}</p>
                    <p class="text-sm font-semibold text-cream-100">${{ ((item.price ?? 0) * (item.quantity ?? 1)).toFixed(2) }}</p>
                  </div>
                </div>
              </div>

              <!-- Discount Code -->
              <div class="px-5 py-4 border-t border-border">
                <div v-if="!appliedDiscount" class="flex gap-2">
                  <div class="flex-1 relative">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-300 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                    </svg>
                    <input
                      v-model="discountCode"
                      type="text"
                      placeholder="Discount code"
                      class="w-full pl-9 pr-3 py-2.5 text-sm bg-primary-900/60 border border-accent-500/20 rounded-lg text-cream-100 placeholder-cream-300/40 focus:outline-none focus:border-accent-500/40 transition"
                      @keyup.enter="applyDiscount"
                    />
                  </div>
                  <button
                    @click="applyDiscount"
                    :disabled="!discountCode.trim() || applyingDiscount"
                    class="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg bg-accent-500/20 text-accent-400 hover:bg-accent-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
                <div v-else class="flex items-center justify-between p-3 bg-success-500/10 border border-success-500/30 rounded-lg">
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-success-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                      <p class="text-sm font-semibold text-success-400">{{ appliedDiscount.code }}</p>
                      <p class="text-xs text-success-300/70">{{ appliedDiscount.description }}</p>
                    </div>
                  </div>
                  <button @click="removeDiscount" class="text-xs text-cream-300 hover:text-red-400 transition p-1">Remove</button>
                </div>
                <p v-if="discountError" class="text-xs text-red-400 mt-2 ml-1">{{ discountError }}</p>
              </div>

              <!-- Totals（LUNA 暗色风格：cream 文字配暗色背景） -->
              <div class="px-5 py-4 space-y-3 border-t border-border">
                <div class="flex justify-between text-sm">
                  <span class="text-cream-300">Subtotal · {{ cartStore.cartCount }} {{ cartStore.cartCount === 1 ? 'item' : 'items' }}</span>
                  <span class="font-medium text-cream-100">${{ cartStore.subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-cream-300">Shipping</span>
                  <span v-if="shippingPrice === 0" class="font-medium text-success-400">Free</span>
                  <span v-else class="font-medium text-cream-100">${{ shippingPrice.toFixed(2) }}</span>
                </div>
                <div v-if="form.giftWrap" class="flex justify-between text-sm">
                  <span class="text-cream-300">Gift Wrap</span>
                  <span class="font-medium text-cream-100">$5.00</span>
                </div>
                <div v-if="appliedDiscount" class="flex justify-between text-sm text-success-400">
                  <span>Discount</span>
                  <span class="font-medium">−${{ discountAmount.toFixed(2) }}</span>
                </div>
                <div class="border-t border-border pt-3 flex justify-between text-base">
                  <span class="font-bold text-cream-100">Total</span>
                  <div class="text-right">
                    <span class="font-bold text-xl text-cream-100 font-display">
                      <span class="text-xs align-super">USD </span>${{ finalTotal.toFixed(2) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Trust Badges（暗色风格：玫红盾形 + cream 文字） -->
              <div class="px-5 py-3.5 border-t border-border flex items-center justify-center gap-3 bg-primary-900/30">
                <svg class="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <div class="text-[10px] text-cream-300 text-center leading-relaxed">
                  <p class="font-semibold text-cream-200">SECURE CHECKOUT</p>
                  <p>256-bit SSL Encryption · Discreet Billing</p>
                </div>
              </div>

              <!-- Payment Badges（暗色背景：卡品牌标志 + 暗色边框背景块） -->
              <div class="px-5 py-2.5 border-t border-border flex items-center justify-center gap-2 bg-primary-900/50">
                <!-- PayPal（双蓝斜体字） -->
                <span class="text-[13px] font-bold italic leading-none" style="color: #003087;">Pay<span style="color: #009cde;">Pal</span></span>
                <!-- Visa（蓝色斜体字） -->
                <span class="text-[13px] font-bold italic leading-none tracking-tight" style="color: #4A6FE3;">VISA</span>
                <!-- Mastercard（红橙交叠圆） -->
                <div class="flex items-center leading-none">
                  <div class="w-3.5 h-3.5 rounded-full" style="background: #EB001B;"></div>
                  <div class="w-3.5 h-3.5 rounded-full -ml-2" style="background: #F79E1B; mix-blend-mode: screen;"></div>
                </div>
                <!-- Amex（蓝底白字徽章） -->
                <div class="h-4 px-1.5 rounded-sm flex items-center" style="background: #2E77BC;">
                  <span class="text-[8px] font-extrabold text-white leading-none tracking-tight">AMEX</span>
                </div>
                <!-- Discover（橙字） -->
                <span class="text-[11px] font-bold italic leading-none" style="color: #FF8A1A;">DISCOVER</span>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

useSeoMeta({
  title: 'Checkout · LUNA·SENSUAL',
  description: 'Complete your order securely with PayPal. Discreet packaging & complimentary shipping on orders over $75.',
  robots: 'noindex, follow'
})

declare global {
  interface Window {
    paypal?: any
    google?: any
  }
}

const cartStore = useCartStore()
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

// ── Form State ──
const form = reactive({
  email: '',
  phone: '',
  firstName: '',
  lastName: '',
  country: '',
  address: '',
  address2: '',
  city: '',
  state: '',
  zipCode: '',
  shippingMethod: 'standard',
  newsletter: true,
  giftWrap: false,
  terms: false,
  // 支付方式
  paymentMethod: 'paypal' as 'paypal' | 'card',
  // 信用卡字段（仅当 paymentMethod === 'card' 时使用）
  cardNumber: '',
  cardName: '',
  cardExpiry: '',
  cardCvv: ''
})

const errors = reactive<Record<string, string>>({})
const isSubmitting = ref(false)
const isHandlingPayPalReturn = ref(false)
const focusedField = ref('')
const cardFieldsInstance = ref<any | null>(null)
const cardFieldsRendered = ref(false)
const cardFieldsEligible = ref(false)
const cardFieldsNotice = ref('')

const inputClass = (field?: string, fieldError?: string) => {
  const hasError = field && errors[field]
  return [
    'w-full px-4 py-3 bg-primary-900/60 border-2 rounded-lg text-sm text-cream-100 placeholder:text-cream-300/55 caret-accent-400 focus:outline-none transition-all',
    hasError || fieldError
      ? 'border-red-500/60'
      : `border-accent-500/20 hover:border-accent-500/30 ${field && focusedField.value === field ? 'border-accent-500 shadow-[0_0_0_2px_rgba(255,27,107,0.15)]' : ''}`
  ].join(' ')
}

const selectClass = (field: string) => {
  const hasError = !!errors[field]
  return [
    'w-full px-4 py-3 bg-primary-900/60 border-2 rounded-lg text-sm text-cream-100 focus:outline-none transition cursor-pointer',
    hasError
      ? 'border-red-500/60'
      : focusedField.value === field
      ? 'border-accent-500 shadow-[0_0_0_2px_rgba(255,27,107,0.15)]'
      : 'border-accent-500/20 hover:border-accent-500/30'
  ].join(' ')
}

const cardFieldClass = (field: string) => {
  const hasError = !!errors[field]
  return [
    'paypal-card-field',
    hasError ? 'paypal-card-field-error' : ''
  ].join(' ').trim()
}

const resetCardErrors = () => {
  ;['cardNumber', 'cardName', 'cardExpiry', 'cardCvv'].forEach(field => {
    errors[field] = ''
  })
}

// ── Shipping Methods ──
const shippingMethods = [
  { id: 'standard', label: 'Standard Shipping', description: '3–7 business days · Discreet packaging', price: 0, eta: '3-7 business days' },
  { id: 'express', label: 'Express Shipping', description: '1–2 business days · Tracked & insured', price: 15.00, eta: '1-2 business days' }
]
const shippingPrice = computed(() => shippingMethods.find(m => m.id === form.shippingMethod)?.price ?? 0)

const canSubmitManual = computed(() => {
  return !!(
    form.email.trim() &&
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.address.trim() &&
    form.city.trim() &&
    form.state.trim() &&
    form.zipCode.trim() &&
    form.country &&
    form.terms &&
    !isSubmitting.value
  )
})

const canSubmitCard = computed(() => {
  if (usingHostedCardFields.value) {
    return !!(
      canSubmitManual.value &&
      form.cardName.trim()
    )
  }
  return false
})

const usingHostedCardFields = computed(() => cardFieldsEligible.value && paypalSdkReady.value)
const shouldRenderHostedCardFieldContainers = computed(() => {
  return form.paymentMethod === 'card' && paypalSdkReady.value && !cardFieldsNotice.value
})

const hasCompleteBuyerInfo = computed(() => {
  return !!(
    form.email.trim() &&
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.address.trim() &&
    form.city.trim() &&
    form.state.trim() &&
    form.zipCode.trim() &&
    form.country
  )
})

// ── Discount Codes ──
const discountCode = ref('')
const applyingDiscount = ref(false)
const discountError = ref('')
const appliedDiscount = ref<{ code: string; type: 'percent' | 'fixed'; value: number; description: string } | null>(null)

const discountCodes: Record<string, { type: 'percent' | 'fixed'; value: number; description: string }> = {
  'LUNA10':  { type: 'percent', value: 10, description: '10% off your order' },
  'LUNA20':  { type: 'percent', value: 20, description: '20% off your order' },
  'WELCOME': { type: 'fixed',   value: 15, description: '$15 off your first order' },
  'VIP50':   { type: 'percent', value: 50, description: 'VIP 50% off' },
  'FREESHIP':{ type: 'fixed',   value: 0,  description: 'Free shipping applied' }
}

const discountAmount = computed(() => {
  if (!appliedDiscount.value) return 0
  if (appliedDiscount.value.type === 'percent') return (cartStore.subtotal * appliedDiscount.value.value) / 100
  return Math.min(appliedDiscount.value.value, cartStore.subtotal)
})

const finalTotal = computed(() => {
  const base = cartStore.total
  const discount = discountAmount.value
  const shipping = shippingPrice.value
  const giftWrap = form.giftWrap ? 5 : 0
  return Math.max(0, base - discount + shipping + giftWrap)
})

const applyDiscount = () => {
  discountError.value = ''
  const code = discountCode.value.trim().toUpperCase()
  if (!code) return
  applyingDiscount.value = true
  setTimeout(() => {
    const discount = discountCodes[code]
    if (discount) {
      appliedDiscount.value = { code, ...discount }
      discountCode.value = ''
    } else {
      discountError.value = 'Invalid discount code. Try LUNA10 or WELCOME.'
    }
    applyingDiscount.value = false
  }, 400)
}

const removeDiscount = () => {
  appliedDiscount.value = null
  discountError.value = ''
}

// ── Card Formatting ──
// 卡号：每 4 位加空格
const formatCardNumber = () => {
  const digits = form.cardNumber.replace(/\D/g, '').slice(0, 19)
  form.cardNumber = digits.replace(/(.{4})/g, '$1 ').trim()
}

// 有效期：MM/YY 自动加斜杠
const formatCardExpiry = () => {
  const digits = form.cardExpiry.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) {
    form.cardExpiry = digits.slice(0, 2) + '/' + digits.slice(2)
  } else {
    form.cardExpiry = digits
  }
}

// ── Validation ──
const validateField = (field: string) => {
  errors[field] = ''
  switch (field) {
    case 'email':
      if (!form.email.trim()) errors.email = 'Enter an email'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email'
      break
    case 'firstName':
      if (!form.firstName.trim()) errors.firstName = 'Enter a first name'
      break
    case 'lastName':
      if (!form.lastName.trim()) errors.lastName = 'Enter a last name'
      break
    case 'address':
      if (!form.address.trim()) errors.address = 'Enter an address'
      break
    case 'city':
      if (!form.city.trim()) errors.city = 'Enter a city'
      break
    case 'state':
      if (!form.state.trim()) errors.state = 'Enter a state'
      break
    case 'phone':
      if (form.phone && !/^[\d\s\-+().]{7,}$/.test(form.phone)) errors.phone = 'Enter a valid phone number'
      break
    case 'zipCode':
      if (!form.zipCode.trim()) errors.zipCode = 'Enter a ZIP code'
      else if (!/^[\d\-\s]{3,10}$/.test(form.zipCode)) errors.zipCode = 'Enter a valid ZIP code'
      break
    case 'country':
      if (!form.country) errors.country = 'Select a country/region'
      break
    case 'cardNumber':
      if (usingHostedCardFields.value) break
      if (!form.cardNumber.replace(/\s/g, '')) errors.cardNumber = 'Enter a card number'
      else if (form.cardNumber.replace(/\s/g, '').length < 13) errors.cardNumber = 'Card number is too short'
      break
    case 'cardName':
      if (!form.cardName.trim()) errors.cardName = 'Enter the cardholder name'
      break
    case 'cardExpiry':
      if (usingHostedCardFields.value) break
      if (!form.cardExpiry) errors.cardExpiry = 'Enter expiration date'
      else if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) errors.cardExpiry = 'Use MM/YY format'
      else {
        const [mm, yy] = form.cardExpiry.split('/').map(Number)
        if (mm < 1 || mm > 12) errors.cardExpiry = 'Invalid month'
        else if (yy < 25) errors.cardExpiry = 'Card expired'
      }
      break
    case 'cardCvv':
      if (usingHostedCardFields.value) break
      if (!form.cardCvv) errors.cardCvv = 'Enter CVV'
      else if (form.cardCvv.length < 3) errors.cardCvv = 'CVV is too short'
      break
  }
}

const validateAll = (): boolean => {
  ;['email', 'firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'country'].forEach(f => validateField(f))
  errors.terms = ''
  if (!form.terms) errors.terms = 'You must agree to the terms of service.'

  // 卡支付时验证卡字段
  if (form.paymentMethod === 'card') {
    if (usingHostedCardFields.value) {
      validateField('cardName')
    } else {
      ;['cardNumber', 'cardName', 'cardExpiry', 'cardCvv'].forEach(f => validateField(f))
    }
  }

  return Object.values(errors).every(e => !e) && canSubmitManual.value
}

// ── Build PayPal Data ──
const buildBuyer = () => ({
  firstName: form.firstName,
  lastName: form.lastName,
  email: form.email,
  shippingAddress: {
    addressLine1: form.address,
    addressLine2: form.address2,
    adminArea2: form.city,
    adminArea1: form.state,
    postalCode: form.zipCode,
    countryCode: form.country
  }
})

const buildItems = () => cartStore.items.map(item => ({
  id: item.id,
  name: item.name,
  quantity: Number(item.quantity) || 1,
  unitPrice: Number(item.price) || 0,
  size: item.size,
  color: item.color
}))

const buildOrderBreakdown = () => ({
  itemTotal: cartStore.subtotal,
  taxTotal: cartStore.tax,
  shipping: shippingPrice.value,
  handling: form.giftWrap ? 5 : 0,
  discount: discountAmount.value
})

const getOrderRequestPayload = (fundingSource: 'paypal' | 'card' | 'applepay' | 'googlepay' = 'paypal') => ({
  amount: finalTotal.value,
  currency: 'USD',
  fundingSource,
  shippingMethod: form.shippingMethod,
  giftWrap: form.giftWrap,
  discountCode: appliedDiscount.value?.code || '',
  buyer: hasCompleteBuyerInfo.value ? buildBuyer() : undefined,
  items: buildItems(),
  orderBreakdown: buildOrderBreakdown()
})

const getBillingAddress = () => ({
  addressLine1: form.address,
  addressLine2: form.address2 || undefined,
  adminArea2: form.city,
  adminArea1: form.state,
  postalCode: form.zipCode,
  countryCode: form.country
})

const buildOrderContext = () => ({
  firstName: form.firstName,
  lastName: form.lastName,
  email: form.email,
  phone: form.phone,
  address: form.address,
  address2: form.address2,
  city: form.city,
  state: form.state,
  zipCode: form.zipCode,
  country: form.country,
  shippingMethod: form.shippingMethod,
  subtotal: cartStore.subtotal,
  tax: cartStore.tax,
  shipping: shippingPrice.value,
  giftWrap: form.giftWrap,
  giftWrapFee: form.giftWrap ? 5 : 0,
  total: finalTotal.value,
  discountCode: appliedDiscount.value?.code || '',
  discountAmount: discountAmount.value,
  items: cartStore.items.map(item => ({ ...item }))
})

const persistPendingOrderContext = () => {
  if (!import.meta.client) return
  localStorage.setItem('pendingOrderContext', JSON.stringify(buildOrderContext()))
}

const readPendingOrderContext = () => {
  if (!import.meta.client) return null

  const raw = localStorage.getItem('pendingOrderContext')
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch (error) {
    console.error('Failed to read pending order context:', error)
    return null
  }
}

const clearPendingOrderContext = () => {
  if (!import.meta.client) return
  localStorage.removeItem('pendingOrderContext')
}

const restorePendingOrderContext = () => {
  const pendingOrderContext = readPendingOrderContext()
  if (!pendingOrderContext) return false

  form.email = pendingOrderContext.email || form.email
  form.phone = pendingOrderContext.phone || form.phone
  form.firstName = pendingOrderContext.firstName || form.firstName
  form.lastName = pendingOrderContext.lastName || form.lastName
  form.country = pendingOrderContext.country || form.country
  form.address = pendingOrderContext.address || form.address
  form.address2 = pendingOrderContext.address2 || form.address2
  form.city = pendingOrderContext.city || form.city
  form.state = pendingOrderContext.state || form.state
  form.zipCode = pendingOrderContext.zipCode || form.zipCode
  form.shippingMethod = pendingOrderContext.shippingMethod || form.shippingMethod
  form.giftWrap = pendingOrderContext.giftWrap ?? form.giftWrap
  form.terms = true

  if (pendingOrderContext.discountCode) {
    const code = String(pendingOrderContext.discountCode).toUpperCase()
    const discount = discountCodes[code]
    if (discount) {
      discountCode.value = code
      appliedDiscount.value = { code, ...discount }
    }
  }

  return true
}

const readOrderHistory = () => {
  if (!import.meta.client) return []

  try {
    const raw = localStorage.getItem('order_history')
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Failed to read order history:', error)
    return []
  }
}


// ── Manual Submit (PayPal payment from Payment section) ──
const handleSubmit = () => {
  if (!validateAll()) {
    // 验证失败：滚动到第一个错误字段（Shopify 风格）
    if (import.meta.client) {
      nextTick(() => {
        const firstErrorKey = Object.keys(errors).find(k => errors[k])
        if (firstErrorKey) {
          const el = document.querySelector(`[data-field="${firstErrorKey}"]`) as HTMLElement | null
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            // 给该字段加上视觉错误高亮
            el.classList.add('error-shake')
            setTimeout(() => el.classList.remove('error-shake'), 600)
          }
        }
      })
    }
    return
  }
  if (form.paymentMethod === 'card') {
    triggerCardPayment()
  } else {
    triggerManualPayPal()
  }
}

const initCardFields = async () => {
  cardFieldsInstance.value = null
  cardFieldsEligible.value = false
  cardFieldsRendered.value = false
  cardFieldsNotice.value = ''

  if (!window.paypal?.CardFields) {
    cardFieldsNotice.value = 'PayPal Card Fields did not load. Confirm this app has Advanced Credit and Debit Card Payments enabled, then try again.'
    return
  }

  await nextTick()

  const numberEl = document.getElementById('card-number-field')
  const expiryEl = document.getElementById('card-expiry-field')
  const cvvEl = document.getElementById('card-cvv-field')

  if (!numberEl || !expiryEl || !cvvEl) return

  numberEl.innerHTML = ''
  expiryEl.innerHTML = ''
  cvvEl.innerHTML = ''

  try {
    const cardFields = window.paypal.CardFields({
      style: {
        input: {
          background: 'transparent',
          'background-color': 'transparent',
          border: 'none',
          outline: 'none',
          'box-shadow': 'none',
          color: '#18181B',
          '-webkit-text-fill-color': '#18181B',
          'caret-color': '#FF1B6B',
          'font-size': '16px',
          'font-weight': '600',
          'letter-spacing': '0.04em',
          'line-height': '1.4',
          'font-family': 'Montserrat, sans-serif'
        },
        ':focus': {
          color: '#18181B',
          '-webkit-text-fill-color': '#18181B'
        },
        '::placeholder': {
          color: 'rgba(24, 24, 27, 0.42)'
        },
        '.valid': {
          color: '#18181B',
          '-webkit-text-fill-color': '#18181B'
        },
        '.invalid': {
          color: '#f87171',
          '-webkit-text-fill-color': '#f87171'
        }
      },
      createOrder: async () => {
        const res = await $fetch('/api/payment/create-order', {
          method: 'POST',
          body: getOrderRequestPayload('card')
        })
        return res.id
      },
      onApprove: async (data: { orderID: string }) => {
        await handlePaymentSuccess('card', data.orderID)
      },
      onError: (err: any) => {
        console.error('Card fields error:', err)
        applyCardPaymentError(err)
        isSubmitting.value = false
      }
    })

    if (cardFields.isEligible?.() === false) {
      cardFieldsEligible.value = false
      cardFieldsRendered.value = false
      cardFieldsNotice.value = 'Advanced card payments are not enabled for this PayPal app yet. Turn on Advanced Credit and Debit Card Payments in PayPal Dashboard > Apps & Credentials > Features > Accept payments.'
      return
    }

    await Promise.all([
      cardFields.NumberField({ placeholder: '1234 1234 1234 1234' }).render('#card-number-field'),
      cardFields.ExpiryField({ placeholder: 'MM/YY' }).render('#card-expiry-field'),
      cardFields.CVVField({ placeholder: 'CVV' }).render('#card-cvv-field')
    ])

    cardFieldsInstance.value = cardFields
    cardFieldsEligible.value = true
    cardFieldsRendered.value = true
    cardFieldsNotice.value = ''
    resetCardErrors()
  } catch (error) {
    console.error('Failed to initialize card fields:', error)
    cardFieldsInstance.value = null
    cardFieldsEligible.value = false
    cardFieldsRendered.value = false
    cardFieldsNotice.value = 'We could not load PayPal secure card fields. Please verify your PayPal app supports Advanced Card payments, then try again.'
  }
}

// 卡支付（真实 PayPal Card Fields）
const triggerCardPayment = async () => {
  resetCardErrors()
  isSubmitting.value = true
  try {
    if (!usingHostedCardFields.value || !cardFieldsInstance.value) {
      errors.cardNumber = cardFieldsNotice.value || 'Secure card fields are unavailable right now.'
      return
    }

    persistPendingOrderContext()

    await cardFieldsInstance.value.submit({
      cardholderName: form.cardName.trim(),
      billingAddress: getBillingAddress()
    })
  } catch (e) {
    console.error('Card payment failed:', e)
    applyCardPaymentError(e)
  } finally {
    isSubmitting.value = false
  }
}

const applyCardPaymentError = (error: any) => {
  const rawMessage = String(error?.message || error?.name || error?.details?.[0]?.issue || '').toUpperCase()

  if (rawMessage.includes('INVALID_NUMBER')) {
    errors.cardNumber = 'Enter a valid card number.'
    return
  }

  if (rawMessage.includes('INVALID_EXPIRY')) {
    errors.cardExpiry = 'Enter a valid expiration date.'
    return
  }

  if (rawMessage.includes('INVALID_CVV')) {
    errors.cardCvv = 'Enter a valid security code.'
    return
  }

  if (rawMessage.includes('INSTRUMENT_DECLINED')) {
    errors.cardNumber = 'This card was declined. Please try a different card.'
    return
  }

  errors.cardNumber = 'Card payment failed. Please check your details and try again.'
}

const getPaymentErrorMessage = (error: any, fallback: string) => {
  const message = error?.data?.message || error?.statusMessage || error?.message
  if (typeof message !== 'string') return fallback

  if (/fetch failed|timeout|timed out/i.test(message)) {
    return 'We could not reach PayPal just now. Please try again in a moment.'
  }

  return message
}

const triggerManualPayPal = async () => {
  paypalError.value = ''
  isSubmitting.value = true
  try {
    persistPendingOrderContext()

    const res = await $fetch('/api/payment/create-order', {
      method: 'POST',
      body: getOrderRequestPayload('paypal')
    })

    const approvalLink = res.links?.find((link: any) =>
      link?.rel === 'payer-action' || link?.rel === 'approve'
    )?.href

    if (!approvalLink) {
      throw new Error('PayPal approval link missing')
    }

    await navigateTo(approvalLink, { external: true })
  } catch (err) {
    console.error('Payment error:', err)
    paypalError.value = getPaymentErrorMessage(err, 'Payment failed. Please try again.')
    isSubmitting.value = false
  }
}

// ── PayPal Express Checkout — 当前渲染 PayPal / Apple Pay / Google Pay ──
const paypalError = ref('')
const googlePayClient = ref<any | null>(null)
// 哪些 funding source 在当前设备/国家可用（驱动模板只渲染可用按钮）
// 用 markRaw 防止 Vue 把 PayPal Button 实例做成响应式（避免 iframe 被重渲染清掉）
const availableFunding = reactive<{ paypal: boolean; applepay: boolean; googlepay: boolean; rendered: boolean }>({
  paypal: false,
  applepay: false,
  googlepay: false,
  rendered: false  // PayPal SDK 渲染完成后才设 true，避免 v-show 切换时清掉 iframe
})
// PayPal SDK 是否已加载完成（用于控制 Express checkout 整段 + OR 分隔符显示）
const paypalSdkReady = ref(false)
const hasExpressCheckout = computed(() =>
  availableFunding.paypal || availableFunding.applepay || availableFunding.googlepay
)
const walletSandboxNote = computed(() => {
  if (runtimeConfig.public.paypalMode === 'live' || !paypalSdkReady.value) return ''

  if (isLocalhostOrigin()) {
    return 'Sandbox tip: Apple Pay and Google Pay are more reliable over an HTTPS test domain than localhost.'
  }

  if (!runtimeConfig.public.paypalMerchantId) {
    return 'Sandbox tip: If Google Pay still does not appear, add PAYPAL_MERCHANT_ID and confirm this browser already has Google Pay configured.'
  }

  return 'Sandbox tip: Wallet visibility still depends on device, browser, account, and merchant eligibility.'
})
const paymentMethodHint = computed(() => {
  if (form.paymentMethod === 'card') {
    return usingHostedCardFields.value
      ? 'Your card details are securely hosted by PayPal and never touch our server.'
      : 'If secure card fields do not load, you can still continue with the PayPal button above while we finish wallet setup.'
  }

  if (!hasExpressCheckout.value) {
    return 'Express wallets are unavailable on this device right now, but you can still complete checkout with your card below.'
  }

  if (!availableFunding.applepay || !availableFunding.googlepay) {
    return 'If Apple Pay or Google Pay does not appear here, you can still complete checkout with PayPal or a card below.'
  }

  return 'Choose any available wallet above, or continue with card details below.'
})

// 检测某个 funding source 是否在当前环境可用
const checkFundingAvailable = (name: 'paypal' | 'applepay' | 'googlepay'): boolean => {
  if (!window.paypal) return false
  // PayPal 自身永远显示
  if (name === 'paypal') return true
  // Apple Pay 需要：(1) SDK 加载 (2) Applepay 组件可用 (3) 设备/浏览器 isEligible
  if (name === 'applepay') {
    return !!(
      window.paypal.Applepay?.isEligible &&
      typeof window.paypal.Applepay.isEligible === 'function' &&
      window.paypal.Applepay.isEligible()
    )
  }
  if (name === 'googlepay') {
    return !!(
      window.paypal.Googlepay &&
      window.google?.payments?.api?.PaymentsClient
    )
  }
  return false
}

// 重新检测并更新 availableFunding（SDK 加载完成后调用）
const updateAvailableFunding = () => {
  availableFunding.paypal = checkFundingAvailable('paypal')
  availableFunding.applepay = checkFundingAvailable('applepay')
  availableFunding.googlepay = checkFundingAvailable('googlepay')
}

const getGooglePayEnvironment = () => {
  return runtimeConfig.public.paypalMode === 'live' ? 'PRODUCTION' : 'TEST'
}

const isLocalhostOrigin = () => {
  if (!import.meta.client) return false

  const hostname = window.location.hostname
  return hostname === 'localhost' || hostname === '127.0.0.1'
}

const getGooglePayRenderErrorMessage = (error: any) => {
  const fallback = 'Google Pay is currently unavailable on this device or merchant configuration.'
  const message = String(error?.message || '')

  if (isLocalhostOrigin() && /failed to fetch|googlepay_config_error/i.test(message)) {
    return 'Google Pay sandbox is being blocked on localhost. Please test through an HTTPS tunnel or a real domain.'
  }

  return fallback
}

const getGooglePaymentsClient = () => {
  if (!window.google?.payments?.api?.PaymentsClient) return null

  if (!googlePayClient.value) {
    googlePayClient.value = new window.google.payments.api.PaymentsClient({
      environment: getGooglePayEnvironment(),
      paymentDataCallbacks: {
        onPaymentAuthorized: (paymentData: any) => handleGooglePayAuthorized(paymentData)
      }
    })
  }

  return googlePayClient.value
}

const buildGooglePayTransactionInfo = (countryCode?: string) => ({
  countryCode: countryCode || form.country || 'US',
  currencyCode: 'USD',
  totalPriceStatus: 'FINAL',
  totalPrice: finalTotal.value.toFixed(2),
  totalPriceLabel: 'Total'
})

const buildGooglePayPaymentDataRequest = (googlePayConfig: any) => ({
  apiVersion: googlePayConfig.apiVersion || 2,
  apiVersionMinor: googlePayConfig.apiVersionMinor || 0,
  allowedPaymentMethods: googlePayConfig.allowedPaymentMethods,
  merchantInfo: googlePayConfig.merchantInfo,
  transactionInfo: buildGooglePayTransactionInfo(googlePayConfig.countryCode),
  callbackIntents: ['PAYMENT_AUTHORIZATION']
})

const handleGooglePayAuthorized = async (paymentData: any) => {
  try {
    persistPendingOrderContext()

    const res = await $fetch('/api/payment/create-order', {
      method: 'POST',
      body: getOrderRequestPayload('googlepay')
    })

    const googlePay = window.paypal?.Googlepay?.()
    if (!googlePay?.confirmOrder) {
      throw new Error('Google Pay session unavailable')
    }

    const confirmOrderResponse = await googlePay.confirmOrder({
      orderId: res.id,
      paymentMethodData: paymentData.paymentMethodData
    })

    if (
      confirmOrderResponse?.status === 'PAYER_ACTION_REQUIRED' &&
      typeof googlePay.initiatePayerAction === 'function'
    ) {
      await googlePay.initiatePayerAction({ orderId: res.id })
    } else if (confirmOrderResponse?.status !== 'APPROVED') {
      throw new Error(`Google Pay confirmation failed: ${confirmOrderResponse?.status || 'UNKNOWN'}`)
    }

    await handlePaymentSuccess('googlepay', res.id)
    paypalError.value = ''

    return { transactionState: 'SUCCESS' }
  } catch (error: any) {
    console.error('Google Pay payment error:', error)

    const message = getPaymentErrorMessage(error, 'Google Pay payment failed. Please try again.')
    paypalError.value = message

    return {
      transactionState: 'ERROR',
      error: {
        intent: 'PAYMENT_AUTHORIZATION',
        message
      }
    }
  }
}

const renderPayPalButton = async () => {
  if (!window.paypal?.Buttons) return

  // 1) 先检测可用 funding sources + 标记 SDK ready（触发 Vue 重新渲染 v-show）
  updateAvailableFunding()
  paypalSdkReady.value = true

  // 2) 等待 Vue 完成 DOM 更新（v-show 切换完成、容器可见性正确）
  await nextTick()

  // 3) 渲染 PayPal 按钮（DOM 已稳定，iframe 不会被清掉）
  if (availableFunding.paypal) {
    const paypalEl = document.getElementById('paypal-btn-paypal')
    if (paypalEl) {
      paypalEl.innerHTML = ''
      try {
        const button = window.paypal.Buttons({
          style: {
            layout: 'horizontal',
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
            height: 48,
            tagline: false
          },
          createOrder: async () => {
            persistPendingOrderContext()
            const res = await $fetch('/api/payment/create-order', {
              method: 'POST',
              body: getOrderRequestPayload('paypal')
            })
            return res.id
          },
          onApprove: async (data: { orderID: string }) => {
            await handlePaymentSuccess('paypal', data.orderID)
          },
          onCancel: () => console.log('PayPal cancelled'),
          onError: (err: any) => console.error('PayPal error:', err)
        })
        if (button.isEligible?.() === false) {
          availableFunding.paypal = false
        } else {
          await button.render('#paypal-btn-paypal')
        }
      } catch (e) {
        console.error('PayPal render failed:', e)
        availableFunding.paypal = false
      }
    }
  }

  // 2) Apple Pay 按钮（PayPal SDK 提供的官方 applepay 组件）
  // 仅在 availableFunding.applepay === true 时渲染（容器用 v-show 隐藏）
  // 完整流程：用户点 Apple Pay → 调起 Apple Pay sheet → 授权 → PayPal 捕获订单
  if (availableFunding.applepay) {
    const applePayEl = document.getElementById('paypal-btn-applepay')
    if (applePayEl) {
      applePayEl.innerHTML = ''
      try {
        const applePay = window.paypal.Applepay({
          // 必填：订单创建回调
          createOrder: async () => {
            persistPendingOrderContext()
            const res = await $fetch('/api/payment/create-order', {
              method: 'POST',
              body: getOrderRequestPayload('applepay')
            })
            return res.id
          },
          // 必填：支付批准回调
          onApprove: async (data: { orderID: string }) => {
            await handlePaymentSuccess('applepay', data.orderID)
          },
          onCancel: () => console.log('Apple Pay cancelled'),
          onError: (err: any) => console.error('Apple Pay error:', err)
        })
        applePay.render('#paypal-btn-applepay')
      } catch (e) {
        console.error('Apple Pay render failed:', e)
        // render 失败 → 关闭该按钮可见性
        availableFunding.applepay = false
      }
    }
  }

  // 3) Google Pay 按钮（PayPal SDK 的 googlepay 组件 + Google Pay Web SDK）
  if (availableFunding.googlepay) {
    const googlePayEl = document.getElementById('paypal-btn-googlepay')
    if (googlePayEl) {
      googlePayEl.innerHTML = ''
      try {
        const googlePay = window.paypal.Googlepay?.()
        const paymentsClient = getGooglePaymentsClient()

        if (!googlePay?.config || !paymentsClient) {
          availableFunding.googlepay = false
          return
        }

        const googlePayConfig = await googlePay.config()
        const readiness = await paymentsClient.isReadyToPay({
          apiVersion: googlePayConfig.apiVersion || 2,
          apiVersionMinor: googlePayConfig.apiVersionMinor || 0,
          allowedPaymentMethods: googlePayConfig.allowedPaymentMethods
        })

        if (!readiness?.result) {
          availableFunding.googlepay = false
          return
        }

        const button = paymentsClient.createButton({
          allowedPaymentMethods: googlePayConfig.allowedPaymentMethods,
          buttonColor: 'black',
          buttonType: 'pay',
          onClick: async () => {
            paypalError.value = ''
            persistPendingOrderContext()

            try {
              await paymentsClient.loadPaymentData(
                buildGooglePayPaymentDataRequest(googlePayConfig)
              )
            } catch (error: any) {
              if (!/cancel/i.test(String(error?.statusCode || error?.message || ''))) {
                console.error('Google Pay loadPaymentData failed:', error)
                paypalError.value = getPaymentErrorMessage(
                  error,
                  'Google Pay sheet could not be opened. Please try again.'
                )
              }
            }
          }
        })

        googlePayEl.appendChild(button)
      } catch (e) {
        console.error('Google Pay render failed:', e)
        paypalError.value = getGooglePayRenderErrorMessage(e)
        availableFunding.googlepay = false
      }
    }
  }
}

// 支付成功统一处理
const handlePaymentSuccess = async (method: string, orderId: string) => {
  const capture = await $fetch('/api/payment/capture-order', {
    method: 'POST',
    body: { orderId }
  })

  const pendingOrderContext = readPendingOrderContext()
  const orderItems = cartStore.items.length > 0
    ? cartStore.items.map(item => ({ ...item }))
    : pendingOrderContext?.items || []

  const orderData = {
    paymentMethod: method,
    providerOrderId: capture.id,
    providerCaptureId: capture.captureId,
    paypalOrderId: capture.id,
    captureId: capture.captureId,
    orderNumber: 'LUNA-' + Math.random().toString(36).slice(2, 11).toUpperCase(),
    items: orderItems,
    subtotal: pendingOrderContext?.subtotal ?? cartStore.subtotal,
    tax: pendingOrderContext?.tax ?? cartStore.tax,
    shipping: pendingOrderContext?.shipping ?? shippingPrice.value,
    shippingMethod: pendingOrderContext?.shippingMethod || form.shippingMethod,
    giftWrap: pendingOrderContext?.giftWrap ?? form.giftWrap,
    giftWrapFee: pendingOrderContext?.giftWrapFee ?? (form.giftWrap ? 5 : 0),
    total: pendingOrderContext?.total ?? finalTotal.value,
    discountCode: pendingOrderContext?.discountCode || appliedDiscount.value?.code || '',
    discountAmount: pendingOrderContext?.discountAmount ?? discountAmount.value,
    firstName: pendingOrderContext?.firstName || form.firstName,
    lastName: pendingOrderContext?.lastName || form.lastName,
    email: pendingOrderContext?.email || form.email,
    phone: pendingOrderContext?.phone || form.phone,
    address: pendingOrderContext?.address || form.address,
    address2: pendingOrderContext?.address2 || form.address2,
    city: pendingOrderContext?.city || form.city,
    state: pendingOrderContext?.state || form.state,
    zipCode: pendingOrderContext?.zipCode || form.zipCode,
    country: pendingOrderContext?.country || form.country,
    date: new Date().toISOString(),
    status: 'completed'
  }

  let nocobasePersisted = false
  let nocobaseOrderId: string | number | undefined

  try {
    const persistResult = await $fetch<{ ok: boolean; duplicate?: boolean; orderId?: string | number; orderNo?: string }>('/api/payment/persist-order', {
      method: 'POST',
      body: {
        orderNumber: orderData.orderNumber,
        paymentMethod: orderData.paymentMethod,
        providerOrderId: orderData.providerOrderId,
        providerCaptureId: orderData.providerCaptureId,
        email: orderData.email,
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        phone: orderData.phone,
        currency: 'USD',
        subtotal: orderData.subtotal,
        tax: orderData.tax,
        shipping: orderData.shipping,
        discountAmount: orderData.discountAmount,
        total: orderData.total,
        items: orderData.items,
        rawResponse: capture
      }
    })
    nocobasePersisted = !!persistResult?.ok
    nocobaseOrderId = persistResult?.orderId
  } catch (error) {
    console.error('Failed to persist order to NocoBase:', error)
  }

  const finalOrderData = {
    ...orderData,
    nocobasePersisted,
    nocobaseOrderId
  }

  localStorage.setItem('lastOrder', JSON.stringify(finalOrderData))
  const orderHistory = readOrderHistory()
  const filteredHistory = orderHistory.filter((order: any) => order?.providerCaptureId !== finalOrderData.providerCaptureId)
  filteredHistory.unshift(finalOrderData)
  localStorage.setItem('order_history', JSON.stringify(filteredHistory.slice(0, 20)))
  clearPendingOrderContext()
  cartStore.clearCart()
  navigateTo('/order-success')
}

const handleReturnedPayPalApproval = async () => {
  const orderId = typeof route.query.token === 'string' ? route.query.token : ''
  const returnedFromPayPal = route.query.paypal_return === '1'

  if (!returnedFromPayPal || !orderId || isHandlingPayPalReturn.value) return

  isHandlingPayPalReturn.value = true
  isSubmitting.value = true

  try {
    await handlePaymentSuccess('paypal', orderId)
  } catch (error) {
    console.error('Failed to finalize returned PayPal payment:', error)
    paypalError.value = 'PayPal approved the order, but we could not finalize the payment. Please try again.'
    isSubmitting.value = false
    isHandlingPayPalReturn.value = false
  }
}

const handleReturnedPayPalCancel = () => {
  const returnedFromPayPalCancel = route.query.paypal_cancel === '1'
  if (!returnedFromPayPalCancel) return

  if (restorePendingOrderContext()) {
    paypalError.value = 'PayPal checkout was canceled. Your details are still saved below so you can try again.'
  }

  if (import.meta.client) {
    window.history.replaceState({}, '', '/checkout')
  }
}

// ── Lifecycle ──
onMounted(async () => {
  await cartStore.loadCart()
  handleReturnedPayPalCancel()
  await handleReturnedPayPalApproval()

  let attempts = 0
  const checkPayPal = setInterval(() => {
    attempts++
    if (window.paypal?.Buttons) {
      clearInterval(checkPayPal)
      nextTick(async () => {
        await renderPayPalButton()
        if (form.paymentMethod === 'card') {
          await initCardFields()
        }
      })
      return
    }
    if (attempts >= 80) {
      clearInterval(checkPayPal)
      // SDK 加载失败：标记 ready 但没有任何 funding source 可用 → 模板整段不显示
      paypalSdkReady.value = true
      // 不显示 paypalError（避免误导用户）— 手动结账区域仍可正常使用
    }
  }, 100)

  let googlePayAttempts = 0
  const checkGooglePay = setInterval(() => {
    googlePayAttempts++
    if (
      paypalSdkReady.value &&
      !availableFunding.googlepay &&
      window.paypal?.Googlepay &&
      window.google?.payments?.api?.PaymentsClient
    ) {
      clearInterval(checkGooglePay)
      nextTick(async () => {
        await renderPayPalButton()
      })
      return
    }

    if (googlePayAttempts >= 80) {
      clearInterval(checkGooglePay)
    }
  }, 100)
})

watch(() => form.paymentMethod, async (newMethod, oldMethod) => {
  if (newMethod === oldMethod) return

  resetCardErrors()

  if (newMethod === 'card') {
    cardFieldsRendered.value = false
    await nextTick()
    if (paypalSdkReady.value) {
      await initCardFields()
    }
  }
})

watch(paypalSdkReady, async (ready) => {
  if (!ready) return
  if (form.paymentMethod !== 'card') return
  if (cardFieldsRendered.value || cardFieldsInstance.value) return

  await nextTick()
  await initCardFields()
})

onBeforeUnmount(() => {
  // PayPal / Google Pay 按钮 DOM 卸载时会自动清理
})
</script>

<style scoped>
/* Express checkout 容器保险丝 — 所有 funding source 按钮强制 48px */
.express-pay-btn {
  height: 48px;
  border-radius: 0.875rem; /* 14px = rounded-2xl 风格 */
  overflow: hidden;
  position: relative;
  background: transparent;
}

/* PayPal SDK 内部 iframe/button 强制拉伸到 48px（覆盖 SDK 默认 25px） */
.express-pay-btn :deep(.paypal-button-container),
.express-pay-btn :deep(.paypal-button),
.express-pay-btn :deep(button),
.express-pay-btn :deep(iframe),
.express-pay-btn :deep(.paypal-button-row) {
  height: 48px !important;
  min-height: 48px !important;
  max-height: 48px !important;
  width: 100% !important;
  z-index: 1;
}

.express-pay-btn :deep(button) {
  border-radius: 0.875rem !important;
}

.paypal-card-field {
  min-height: 48px;
  border-radius: 0.5rem;
  border: 2px solid rgba(255, 27, 107, 0.2);
  background: rgba(8, 8, 8, 0.82);
  padding: 11px 14px;
  color: rgb(255 245 234);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.paypal-card-field:hover {
  border-color: rgba(255, 27, 107, 0.3);
}

.paypal-card-field:focus-within {
  border-color: rgb(255 27 107);
  box-shadow: 0 0 0 2px rgba(255, 27, 107, 0.15);
}

.paypal-card-field-error {
  border-color: rgba(239, 68, 68, 0.6);
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.12);
}

.paypal-card-field :deep(iframe) {
  min-height: 24px !important;
  color-scheme: dark;
  opacity: 1 !important;
}

input::placeholder,
textarea::placeholder {
  color: rgba(245, 230, 211, 0.55);
  opacity: 1;
}

input,
textarea {
  color: rgb(245 230 211);
  caret-color: rgb(255 27 107);
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-text-fill-color: rgb(245 230 211);
  box-shadow: 0 0 0 1000px rgba(10, 10, 10, 0.88) inset;
  transition: background-color 9999s ease-out 0s;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 27, 107, 0.15);
  border-radius: 2px;
}

/* 表单验证错误抖动动画 — 滚动到错误字段时的视觉反馈 */
.error-shake {
  animation: errorShake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  border-color: rgb(239, 68, 68) !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
}
@keyframes errorShake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
</style>
