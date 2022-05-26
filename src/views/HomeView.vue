<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import api from "../assets/api";

document.title = useRoute().name;

const items = ref([]);
api.all().then((json) => {
  items.value = json;
});

onMounted(() => {
  document.body
      .querySelector("#delete-product-btn")
      .addEventListener("click", () => {
        const ids = Array.from(
            document.body.querySelectorAll(".delete-checkbox:checked")
        ).map((el) => el.parentElement.id);

        if (ids.length === 0) return;

        api.remove(...ids).then(() => {
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
    <a href="/add-product" class="col-auto">
      <button class="btn btn-primary">ADD</button>
    </a>
    <a class="col-auto">
      <button id="delete-product-btn" class="btn btn-danger">
        MASS DELETE
      </button>
    </a>
  </div>
  <hr/>
  <div class="row justify-content-center cards">
    <div
        class="col-auto border rounded position-relative card"
        v-for="item in items"
        v-bind:key="item['id']"
        v-bind:id="item['id']"
    >
      <input
          type="checkbox"
          class="delete-checkbox form-check-input position-absolute translate-middle"
          style="top: 10%; left: 10%"
      />
      <div
          class="h-100 d-flex flex-column justify-content-center align-items-center"
      >
        <span>{{ item["sku"] }}</span>
        <span>{{ item["name"] }}</span>
        <span>{{ item["price"] }} $</span>
        <span v-if="item['size']">Size: {{ item["size"] }} MB</span>
        <span v-if="item['height'] && item['width'] && item['length']">
          Dimension: {{ [item['height'], item['width'], item['length']].join('x') }}
        </span>
        <span v-if="item['weight']">
          Weight: {{ item["weight"] }}KG
        </span>
      </div>
    </div>
  </div>
</template>

<style>
.cards {
  --gap: 1em;
  gap: var(--gap);
}

.cards .card {
  --items-count: 4;

  width: calc(
      calc(100% - calc(1em * calc(var(--items-count) - 1))) / var(--items-count)
  );

  aspect-ratio: 4 / 3;
}
</style>
