Vue.component('product', {
  props: {
    premium: {
      type: Boolean, 
      required: true
    }
  },
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
        <p>Shipping: {{ shipping }}</p>
        <p>{{ description }}</p>

        <product-details :details="details"></product-details>

        <div v-for="(variant, index) in variants" class="color-box" :style="{ backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)" :key="variant.variantId">
        </div>

        <ul>
          <li v-for="size in sizes">{{ size }}</li>
        </ul>

        <button @click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to Cart</button>
        <button @click="removeItemFromCart" class="remove-item">Remove Item</button>

      </div>

      <product-review></product-review>
    </div>
  `,
  data() {
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
          variantQuantity: 150,
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
      ]
    }
  },
  methods: {
    addToCart: function() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    removeItemFromCart: function() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
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
    },
    shipping() {
      if (this.premium) {
        return "Free"
      } else {
        return "2.99"
      }
    }
  }
})

Vue.component('product-details', {
  props: {
    details: {
      type: Array, 
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail}}</li>
    </ul>
  `
})

Vue.component('product-review', {
  template: `
    <form class="review-form">
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name"/>
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</labe>
        <select id="rating" v-model="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    removeItemFromCart(id) {
      var cart = this.cart
      cart.forEach((productId, index) => {
        numOfItemsToRemove = 1 // We only want to remove one instance of the product
        if (productId == id) {
          cart.splice(index, numOfItemsToRemove)
        }
      })
      return cart
    }
  }
})
