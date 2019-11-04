var app = new Vue({
  el: '#app',
  data: {
    product: "Socks",
    image: "./assets/vmSocks-green-onWhite.jpg",
    description: "A pair of warm, fuzzy socks to keep your feet warm on a cold, winter day.",
    inventory: 100,
    onSale: true,
    details: ["80% Cotton", "20% Polyester", "Gender-Neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "./assets/vmSocks-green-onWhite.jpg",
      },
      {
        variantId: 2235,
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
    updateProduct: function(variantImage) {
      this.image = variantImage
    }
  }
})