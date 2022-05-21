<script setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import api from "../assets/api";

document.title = useRoute().name;

onMounted(() => {
  const show = (id) => {
    document.body
      .querySelector("#productType")
      .querySelectorAll("option:not([value=''])")
      .forEach((form) => {
        const value = form.value;
        const option = document.body.querySelector("#" + value);
        const inputs = option.querySelectorAll("input");

        if (value === id) {
          option.classList.remove("d-none");
          inputs.forEach((input) => (input.required = true));
        } else {
          option.classList.add("d-none");
          inputs.forEach((input) => {
            input.required = false;
            input.value = "";
          });
        }
      });
  };
  show();

  document.body
    .querySelector("#productType")
    .addEventListener("change", (e) => {
      show(e.target.value);
    });

  document.body
    .querySelector("#product_form")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      const form = e.target;
      const values = {};
      form.querySelectorAll(`#${form.id} input:required`).forEach((input) => {
        values[input.name] = input.value;
      });

      api.post(values).then(() => {
        window.location.href = "/";
      });
    });
});
</script>

<template>
  <div class="row">
    <div class="col">
      <h1>{{ useRoute().name }}</h1>
    </div>
    <a class="col-auto">
      <button class="btn btn-success" type="submit" form="product_form">
        Save
      </button>
    </a>
    <a href="/" class="col-auto">
      <button class="btn btn-primary">Cancel</button>
    </a>
  </div>
  <hr />

  <form class="w-50 d-flex flex-column gap-4" id="product_form">
    <div class="d-flex flex-column gap-2">
      <div class="row">
        <label class="col-3 form-label" for="sku">SKU</label>
        <input
          class="col form-control"
          type="text"
          id="sku"
          name="sku"
          required
        />
      </div>
      <div class="row">
        <label class="col-3 form-label" for="name">Name</label>
        <input
          class="col form-control"
          type="text"
          id="name"
          name="name"
          required
        />
      </div>
      <div class="row">
        <label class="col-3 form-label" for="price">Price ($)</label>
        <input
          class="col form-control"
          type="number"
          step=".01"
          min="0"
          id="price"
          name="price"
          required
        />
      </div>
    </div>

    <div class="row">
      <label class="col-auto form-label" for="productType">Type Switcher</label>
      <select class="col form-select" id="productType" required>
        <option value="" selected>Type Switcher</option>
        <option value="DVD">DVD</option>
        <option value="Furniture">Furniture</option>
        <option value="Book">Book</option>
      </select>
    </div>

    <div class="d-flex flex-column gap-2" id="DVD">
      <div class="row">
        <label class="col-auto" for="size">Size (MB)</label>
        <input
          class="col form-control"
          id="size"
          name="size"
          type="number"
          step="100"
          min="100"
        />
      </div>
      <span>Please, provide size</span>
    </div>

    <div class="d-flex flex-column gap-2" id="Furniture">
      <div class="row">
        <label class="col-4 form-label" for="height">Height (CM)</label>
        <input
          class="col form-control"
          id="height"
          name="height"
          type="number"
          min="0"
        />
      </div>
      <div class="row">
        <label class="col-4 form-label" for="width">Width (CM)</label>
        <input
          class="col form-control"
          id="width"
          name="width"
          type="number"
          min="0"
        />
      </div>
      <div class="row">
        <label class="col-4 form-label" for="length">Length (CM)</label>
        <input
          class="col form-control"
          id="length"
          name="length"
          type="number"
          min="0"
        />
      </div>
      <span>Please, provide dimensions</span>
    </div>

    <div class="d-flex flex-column gap-2" id="Book">
      <div class="row">
        <label class="col-auto form-label" for="weight">Weight (CM)</label>
        <input
          class="col form-control"
          id="weight"
          name="weight"
          type="number"
          step=".1"
          min="0"
        />
      </div>
      <span>Please, provide weight</span>
    </div>
  </form>
</template>

<style>
#product_form .row {
  align-items: baseline;
}
</style>
