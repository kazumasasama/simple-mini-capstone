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
      deletingProduct: null,
      updatingProduct: {
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
        .get(`http://localhost:3000/products/${this.updatingProduct.id}`)
        .then(response => {
          this.updatingProduct = response.data;
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
          this.products.push();
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateProduct() {
      axios
        .patch(`http://localhost:3000/products/${this.updatingProduct.id}`, {
          name: this.updatingProduct.name,
          price: this.updatingProduct.price,
          description: this.updatingProduct.description,
          image_url: this.updatingProduct.imageUrl
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
      let id = this.deletingProduct;
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