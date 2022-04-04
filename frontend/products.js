/* global Vue, axios */


var App = {
  data() {
    return {
      message: "Hello Vue!",
      products: [],
      newProduct: {
        name: "",
        price: null,
        description: "",
        imageUrl: ""
      },
      product: {
        id: null,
        name: "",
        price: null,
        description: "",
        imageUrl: ""
      }
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProduct() {
      axios
        .get(`http://localhost:3000/products/${this.product.id}`)
        .then(response => {
          this.product = response.data;
        });
    },
    getProducts() {
      axios
        .get("http://localhost:3000/products")
        .then(response => {
          console.log(response.data);
          this.products = response.data;
        });
    },
    createProduct() {
      axios
        .post("http://localhost:3000/products", {
          name: this.newProduct.name,
          price: this.newProduct.price,
          description: this.newProduct.description,
          image_url: this.newProduct.imageUrl
        })
        .then(response => {
          console.log(response.data);
          this.products.push(this.newProduct);
          this.newProduct = {};
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateProduct() {
      axios
        .patch(`http://localhost:3000/products/${this.product.id}`, {
          name: this.product.name,
          price: this.product.price,
          description: this.product.description,
          image_url: this.product.imageUrl
        })
        .then(response => {
          console.log(response.data);
          location.reload();
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteProduct() {
      let id = this.product.id;
      axios
        .delete(`http://localhost:3000/products/${id}`)
        .then(response => {
          console.log(response.data);
          location.reload();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};

Vue.createApp(App).mount('#app');