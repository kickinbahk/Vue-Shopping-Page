Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
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

        <div>
          <h2>Reviews</h2>
          <p v-if="!reviews.length">There are no reviews yet.</p>
          <ul>
            <li v-for="review in reviews">
              <p>{{ review.name }}</p>
              <p>{{ review.rating }}</p>
              <p>{{ review.review }}</p>
              <p>{{ review.recommended }}</p>
            </li>
          </ul>
        </div>
      </div>

      <product-review @review-submitted="addReview"></product-review>
    </div>
  `,
  data() {
    return {
      product: 'Socks',
      selectedVariant: 0,
      description: 'A pair of warm, fuzzy socks to keep your feet warm on a cold, winter day.',
      onSale: true,
      details: ['80% Cotton', '20% Polyester', 'Gender-Neutral'],
      variants: [
        {
          variantId: 2234,
          variantQuantity: 10,
          variantColor: 'green',
          variantImage: './assets/vmSocks-green-onWhite.jpg',
        },
        {
          variantId: 2235,
          variantQuantity: 150,
          variantColor: 'blue',
          variantImage: './assets/vmSocks-blue-onWhite.jpg',
        },
      ],
      sizes: ['small', 'medium', 'large', 'X-Large', 'XXL'],
      reviews: [],
    };
  },
  methods: {
    addToCart: function() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    removeItemFromCart: function() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
    },
    updateProduct: function(index) {
      this.selectedVariant = index;
      console.log(index);
    },
    addReview: function(productReview) {
      this.reviews.push(productReview);
    },
  },
  computed: {
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inventory() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity > 0;
    },
    shipping() {
      if (this.premium) {
        return 'Free';
      } else {
        return '2.99';
      }
    },
  },
});

Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true,
    },
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail}}</li>
    </ul>
  `,
});

Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">

      <p v-if="errors.length">
        <b>Please correct the following errors</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" />
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</labe>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
      
      <p>
        <label>Would you recommend this product?</label>
        <p>
          <input type="radio" name="recommended" value="yes" v-model="recommended" class="recommended"/><label for="recommended-yes">Yes</label>
        </p> 
        <p>
          <input type="radio" name="recommended" value="no" v-model="recommended" class="recommended" /><label for="recommended-no">No</label>
        </p>
      </p>
      <p>
        <input type="submit" value="Submit" />
      </p>
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommended: null,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating && this.recommended) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommended: this.recommended,
        };

        this.$emit('review-submitted', productReview);

        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommended = null;
      } else {
        if (!this.name) {
          this.errors.push('Name Required');
        }
        if (!this.review) {
          this.errors.push('Review Required');
        }
        if (!this.rating) {
          this.errors.push('Rating Required');
        }
        if (!this.recommended) {
          this.errors.push('Recommendation Required');
        }
      }
    },
  },
});

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeItemFromCart(id) {
      var cart = this.cart;
      cart.forEach((productId, index) => {
        numOfItemsToRemove = 1; // We only want to remove one instance of the product
        if (productId == id) {
          cart.splice(index, numOfItemsToRemove);
        }
      });
      return cart;
    },
  },
});
