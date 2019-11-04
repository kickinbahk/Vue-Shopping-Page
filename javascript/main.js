var app = new Vue({
  el: '#app',
  data: {
    product: "Socks",
    description: "A pair of warm, fuzzy socks to keep your feet warm on a cold, winter day.",
    image: "./assets/vmSocks-green-onWhite.jpg",
    inventory: 100,
    onSale: true,
    details: ["80% Cotton", "20% Polyester", "Gender-Neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green"
      },
      {
        variantId: 2235,
        variantColor: "blue"
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
    }
  }
})