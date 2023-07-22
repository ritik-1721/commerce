import LabelInput from "@/components/ui/LabelInput";

const from = [
  {
    errors: false,
    type: "text",
    touched: false,
    name: "NAME",
    label: "NAME",
    required: false,
  },
  {
    errors: false,
    type: "text",
    touched: false,
    name: "NAME",
    label: "NAME",
    required: false,
  },
  {
    errors: false,
    type: "text",
    touched: false,
    name: "NAME",
    label: "NAME",
    required: false,
  },
  {
    errors: false,
    type: "text",
    touched: false,
    name: "NAME",
    label: "NAME",
    required: false,
  },
  {
    errors: false,
    type: "text",
    touched: false,
    name: "NAME",
    label: "NAME",
    required: false,
  },
];
export default function Page() {
  return (
    <>
      <div>
        <div class="grid w-full grid-cols-1 gap-y-8">
          <div>
            <div class="bg-white">
              <div class="text-xl-semi flex items-center gap-x-4 px-8 pb-6 pt-8">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm text-white">
                  1
                </div>
                <h2>Shipping address</h2>
              </div>
              <div class="px-8 pb-8">
                <div>
                  <div class="grid grid-cols-1 gap-y-2">
                    <div>
                      <div class="text-base-regular relative z-0 w-full">
                        <input
                          type="email"
                          class="peer m-0 block h-[58px]  border-solid bg-transparent bg-clip-padding text-base font-normal leading-tight placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] bg-primary py-2 px-6 w-full appearance-none transition slate-900 duration-150 ease-in-out pr-10 border border-slate-400 focus:border-slate-900 text-slate-700 focus:outline-none focus:shadow-outline-normal focus:ring-2 focus:ring-slate-200"
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label
                          for="floatingInput"
                          class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                          Email address
                        </label>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-x-2">
                      <div>
                        <div class="text-base-regular relative z-0 w-full">
                          <input
                            placeholder=" "
                            class="peer m-0 block h-[58px]  border-solid bg-transparent bg-clip-padding text-base font-normal leading-tight placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] bg-primary py-2 px-6 w-full appearance-none transition slate-900 duration-150 ease-in-out pr-10 border border-slate-400 focus:border-slate-900 text-slate-700 focus:outline-none focus:shadow-outline-normal focus:ring-2 focus:ring-slate-200"
                          
                            autocomplete="given-name"
                            name="shipping_address.first_name"
                          />
                          <label
                            for="shipping_address.first_name"
                            class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                          >
                            First name
                          </label>
                        </div>
                      </div>
                      <div>
                        <div class="text-base-regular relative z-0 w-full">
                          <input
                            placeholder=" "
                            class="peer m-0 block h-[58px]  border-solid bg-transparent bg-clip-padding text-base font-normal leading-tight placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] bg-primary py-2 px-6 w-full appearance-none transition slate-900 duration-150 ease-in-out pr-10 border border-slate-400 focus:border-slate-900 text-slate-700 focus:outline-none focus:shadow-outline-normal focus:ring-2 focus:ring-slate-200"
                          
                            autocomplete="family-name"
                            name="shipping_address.last_name"
                          />
                          <label
                            for="shipping_address.last_name"
                            class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                          >
                            Last name
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="text-base-regular relative z-0 w-full">
                        <input
                          placeholder=" "
                          class="peer m-0 block h-[58px]  border-solid bg-transparent bg-clip-padding text-base font-normal leading-tight placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] bg-primary py-2 px-6 w-full appearance-none transition slate-900 duration-150 ease-in-out pr-10 border border-slate-400 focus:border-slate-900 text-slate-700 focus:outline-none focus:shadow-outline-normal focus:ring-2 focus:ring-slate-200"
                          
                          autocomplete="organization"
                          name="shipping_address.company"
                        />
                        <label
                          for="shipping_address.company"
                          class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                          Company
                        </label>
                      </div>
                    </div>
                    <div>
                      <div class="text-base-regular relative z-0 w-full">
                        <input
                          placeholder=" "
                          class="peer m-0 block h-[58px]  border-solid bg-transparent bg-clip-padding text-base font-normal leading-tight placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] bg-primary py-2 px-6 w-full appearance-none transition slate-900 duration-150 ease-in-out pr-10 border border-slate-400 focus:border-slate-900 text-slate-700 focus:outline-none focus:shadow-outline-normal focus:ring-2 focus:ring-slate-200"
                          
                          autocomplete="address-line1"
                          name="shipping_address.address_1"
                        />
                        <label
                          for="shipping_address.address_1"
                          class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                          Address
                        </label>
                      </div>
                    </div>
                    <div>
                      <div class="text-base-regular relative z-0 w-full">
                        <input
                          placeholder=" "
                          class="peer m-0 block h-[58px]  border-solid bg-transparent bg-clip-padding text-base font-normal leading-tight placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] bg-primary py-2 px-6 w-full appearance-none transition slate-900 duration-150 ease-in-out pr-10 border border-slate-400 focus:border-slate-900 text-slate-700 focus:outline-none focus:shadow-outline-normal focus:ring-2 focus:ring-slate-200"
                          
                          autocomplete="address-line2"
                          name="shipping_address.address_2"
                        />
                        <label
                          for="shipping_address.address_2"
                          class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                          Apartments, suite, etc.
                        </label>
                      </div>
                    </div>
                    <div class="grid grid-cols-[122px_1fr] gap-x-2">
                      <div>
                        <div class="text-base-regular relative z-0 w-full">
                          <input
                            placeholder=" "
                            class="peer m-0 block h-[58px]  border-solid bg-transparent bg-clip-padding text-base font-normal leading-tight placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] bg-primary py-2 px-6 w-full appearance-none transition slate-900 duration-150 ease-in-out pr-10 border border-slate-400 focus:border-slate-900 text-slate-700 focus:outline-none focus:shadow-outline-normal focus:ring-2 focus:ring-slate-200"
                          
                            autocomplete="postal-code"
                            name="shipping_address.postal_code"
                          />
                          <label
                            for="shipping_address.postal_code"
                            class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                          >
                            Postal code
                          </label>
                        </div>
                      </div>
                      <div>
                        <div class="text-base-regular relative z-0 w-full">
                          <input
                            placeholder=" "
                            class="peer m-0 block h-[58px]  border-solid bg-transparent bg-clip-padding text-base font-normal leading-tight placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] bg-primary py-2 px-6 w-full appearance-none transition slate-900 duration-150 ease-in-out pr-10 border border-slate-400 focus:border-slate-900 text-slate-700 focus:outline-none focus:shadow-outline-normal focus:ring-2 focus:ring-slate-200"
                          
                            autocomplete="address-level2"
                            name="shipping_address.city"
                          />
                          <label
                            for="shipping_address.city"
                            class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                          >
                            City
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="text-base-regular relative flex items-center border border-gray-200">
                        <select
                          name="shipping_address.country_code"
                          autocomplete="country"
                          class="flex-1 appearance-none border-none bg-transparent px-4 py-2.5 outline-none transition-colors duration-150 focus:border-gray-700"
                        >
                          <option value="">Country</option>
                          <option value="se">Sweden</option>
                          <option value="gb">United Kingdom</option>
                          <option value="de">Germany</option>
                          <option value="dk">Denmark</option>
                          <option value="fr">France</option>
                          <option value="es">Spain</option>
                          <option value="it">Italy</option>
                        </select>
                        <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 6L8 10L12 6"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div>
                      <div class="text-base-regular relative z-0 w-full">
                        <input
                          placeholder=" "
                          class="peer m-0 block h-[58px]  border-solid bg-transparent bg-clip-padding text-base font-normal leading-tight placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] bg-primary py-2 px-6 w-full appearance-none transition slate-900 duration-150 ease-in-out pr-10 border border-slate-400 focus:border-slate-900 text-slate-700 focus:outline-none focus:shadow-outline-normal focus:ring-2 focus:ring-slate-200"
                          
                          autocomplete="address-level1"
                          name="shipping_address.province"
                        />
                        <label
                          for="shipping_address.province"
                          class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                          State / Province
                        </label>
                      </div>
                    </div>
                    <div>
                      <div class="text-base-regular relative z-0 w-full">
                        <input
                          placeholder=" "
                          class="peer m-0 block h-[58px]  border-solid bg-transparent bg-clip-padding text-base font-normal leading-tight placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] bg-primary py-2 px-6 w-full appearance-none transition slate-900 duration-150 ease-in-out pr-10 border border-slate-400 focus:border-slate-900 text-slate-700 focus:outline-none focus:shadow-outline-normal focus:ring-2 focus:ring-slate-200"
                          
                          autocomplete="tel"
                          name="shipping_address.phone"
                        />
                        <label
                          for="shipping_address.phone"
                          class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                          Phone
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-6">
                  <button
                    class="text-base-regular flex items-center gap-x-2"
                    role="checkbox"
                    type="button"
                    aria-checked="true"
                  >
                    <div
                      role="checkbox"
                      aria-checked="true"
                      class="flex h-5 w-5 items-center justify-center border border-gray-900"
                    >
                      ✓
                    </div>
                    <span>Same as billing address</span>
                  </button>
                </div>
                <button class="text-small-regular mt-6 flex min-h-[50px] w-full max-w-[200px] items-center justify-center border border-gray-900 bg-gray-900 px-5 py-[10px] uppercase text-white transition-colors duration-200 hover:bg-white hover:text-gray-900 disabled:opacity-50 disabled:hover:bg-gray-900 disabled:hover:text-white">
                  Continue to delivery
                </button>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div class="pointer-events-none select-none bg-white opacity-50">
                <div class="text-xl-semi flex items-center gap-x-4 px-8 pb-6 pt-8">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm text-white">
                    2
                  </div>
                  <h2>Delivery</h2>
                </div>
                <div
                  class="max-h-0 overflow-hidden opacity-0 transition-[max-height,opacity] duration-700 ease-in-out"
                  id="headlessui-disclosure-panel-:rj:"
                  data-headlessui-state=""
                >
                  <div>
                    <div id="headlessui-radiogroup-:rk:" role="radiogroup">
                      <div
                        class="flex flex-col items-center justify-center px-4 py-8 text-gray-900"
                        role="none"
                      >
                        <svg
                          class="animate-spin"
                          width="16"
                          height="16"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          role="none"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                            role="none"
                          ></circle>
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            role="none"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="max-h-[9999px] overflow-hidden opacity-100 transition-[max-height,opacity] duration-700 ease-in-out"
                  id="headlessui-disclosure-panel-:rl:"
                  data-headlessui-state=""
                >
                  <div class="text-small-regular px-8 pb-8">
                    <p>Enter your address to see available delivery options.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div class="pointer-events-none select-none bg-white opacity-50">
                <div class="text-xl-semi flex items-center gap-x-4 px-8 pb-6 pt-8">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm text-white">
                    3
                  </div>
                  <h2>Payment</h2>
                </div>
                <div
                  class="max-h-0 overflow-hidden opacity-0 transition-[max-height,opacity] duration-700 ease-in-out"
                  id="headlessui-disclosure-panel-:rm:"
                  data-headlessui-state=""
                >
                  <div>
                    <div class="flex flex-col items-center justify-center px-4 py-16 text-gray-900">
                      <svg
                        class="animate-spin"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div
                  class="max-h-[9999px] overflow-hidden opacity-100 transition-[max-height,opacity] duration-700 ease-in-out"
                  id="headlessui-disclosure-panel-:rn:"
                  data-headlessui-state=""
                >
                  <div class="text-small-regular px-8 pb-8">
                    <p>Enter your address to see available payment options.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
