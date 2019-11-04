Vue.component('product', {
  template: `
    <div class="product">

      <div class="product-image">
        <img :src="image" >
      </div>

      <div class="product-info">
        <h1>{{ product }}</h1>
        <p v-if="inventory > 10"><span v-show="onSale && inStock">On Sale!!! - </span>In Stock</p>
        <p v-else-if="inventory <= 10 && inStock "><span v-show="onSale && inStock">On Sale!!! - </span>Only a few left. Buy Soon!</p>
        <p v-else>Out of Stock</p>
        <p>{{ description }}</p>

        <ul>
          <li v-for="detail in details">{{ detail}}</li>
        </ul>

        <div v-for="(variant, index) in variants" class="color-box" :style="{ backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)" :key="variant.variantId">
        </div>

        <ul>
          <li v-for="size in sizes">{{ size }}</li>
        </ul>

        <button @click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to Cart</button>
        <button @click="removeItemFromCart" class="remove-item">Remove Item</button>

        <div class="cart">
          <p>Cart ({{ cart }})</p>
        </div>
      </div>

    </div>
  `,
  data () {
    return {
      product: "Socks",
      selectedVariant: 0,
      description: "A pair of warm, fuzzy socks to keep your feet warm on a cold, winter day.",
      onSale: true,
      details: ["80% Cotton", "20% Polyester", "Gender-Neutral"],
      variants: [
        {
          variantId: 2234,
          variantQuantity: 10,
          variantColor: "green",
          variantImage: "./assets/vmSocks-green-onWhite.jpg",
        },
        {
          variantId: 2235,
          variantQuantity: 0,
          variantColor: "blue",
          variantImage: "./assets/vmSocks-blue-onWhite.jpg",
        }
      ],
      sizes: [
        "small",
        "medium",
        "large",
        "X-Large",
        "XXL"
      ],
      cart: 0
    }
  },
  methods: {
    addToCart: function() {
      this.cart += 1
    },
    removeItemFromCart: function() {
      var currentCart = this.cart

      if (currentCart > 0) {
        this.cart -= 1
      } else {
        this.cart = 0
      }
    },
    updateProduct: function(index) {
      this.selectedVariant = index
      console.log(index)
    }
  },
  computed: {
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inventory() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity > 0
    }
  }
})

var app = new Vue({
  el: '#app',
  
})