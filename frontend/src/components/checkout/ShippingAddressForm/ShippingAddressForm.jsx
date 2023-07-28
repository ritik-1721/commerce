import React from "react";
import LabelInput from "@/components/ui/LabelInput";
// import "./ShippingAddressForm.css"; // Import the CSS file with styles

function ShippingAddressForm() {
  return (
    <div class="grid grid-cols-1 gap-y-2">
      <LabelInput
        id="shipping_address.email"
        name="shipping_address.email"
        type="email"
        placeholder="Email"
        onChange={null}
        onBlur={null}
        value={""}
        inputHasError={null}
        label={"Email address"}
      />
      <div class="grid grid-cols-2 gap-x-2">
        <LabelInput
          id="shipping_address.first_name"
          name="shipping_address.first_name"
          type="text"
          placeholder="Enter first name."
          onChange={null}
          onBlur={null}
          value={""}
          autocomplete="first-name"
          inputHasError={null}
          label={"First name"}
        />
        <LabelInput
          id="shipping_address.last_name"
          name="shipping_address.last_name"
          type="text"
          placeholder="Enter last name."
          onChange={null}
          onBlur={null}
          value={""}
          autocomplete="last-name"
          inputHasError={null}
          label={"Last name"}
        />
      </div>
      <LabelInput
        id="shipping_address.company"
        name="shipping_address.company"
        type="text"
        placeholder="Enter company."
        onChange={null}
        onBlur={null}
        value={""}
        autocomplete="company"
        inputHasError={null}
        label={"Company"}
      />
      <LabelInput
        id="shipping_address.address_1"
        name="shipping_address.address_1"
        type="text"
        placeholder="Enter address."
        onChange={null}
        onBlur={null}
        value={""}
        autocomplete="address-line1"
        inputHasError={null}
        label={"Address"}
      />
      <LabelInput
        id="shipping_address.address_2"
        name="shipping_address.address_2"
        type="text"
        placeholder=" "
        onChange={null}
        onBlur={null}
        value={""}
        autocomplete="address-line2"
        inputHasError={null}
        label={"Apartments, suite, etc."}
      />

      <div class="grid grid-cols-[122px_1fr] gap-x-2">
        <LabelInput
          id="shipping_address.postal_code"
          name="shipping_address.postal_code"
          type="text"
          placeholder=" "
          onChange={null}
          onBlur={null}
          value={""}
          autocomplete="postal-code"
          inputHasError={null}
          label={"Postal code"}
        />

        <LabelInput
          id="shipping_address.city"
          name="shipping_address.city"
          type="text"
          placeholder=" "
          onChange={null}
          onBlur={null}
          value={""}
          autocomplete="address-level2"
          inputHasError={null}
          label={"City"}
        />
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

      <LabelInput
        id="shipping_address.province"
        name="shipping_address.province"
        type="text"
        placeholder=" "
        onChange={null}
        onBlur={null}
        value={""}
        autocomplete="address-level1"
        inputHasError={null}
        label={"State / Province"}
      />

      <LabelInput
        id="shipping_address.phone"
        name="shipping_address.phone"
        type="text"
        placeholder=" "
        onChange={null}
        onBlur={null}
        value={""}
        autocomplete="tel"
        inputHasError={null}
        label={"Phone"}
      />
    </div>
  );
}

export default ShippingAddressForm;
