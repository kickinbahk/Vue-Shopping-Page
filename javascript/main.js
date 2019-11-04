var app = new Vue({
  el: '#app',
  data: {
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