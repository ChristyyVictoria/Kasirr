<template>
  <div class="container mt-5">
    <h1 class="text-center">Products</h1>

    <!-- Toolbar with search and add product button -->
    <div class="d-flex justify-content-between align-items-center mt-4">
      <input
        type="text"
        class="form-control w-50"
        placeholder="Search product by name"
        v-model="searchQuery"
      />
      <button class="btn btn-primary" @click="showAddProductModal = true">Add Product</button>
    </div>

    <!-- List of products -->
    <div class="mt-4">
      <h3>Product List</h3>
      <div class="row">
        <div class="col-md-4" v-for="product in filteredProducts" :key="product.id">
          <div class="card mb-4 shadow-sm">
            <img :src="product.image" class="card-img-top" alt="Product Image" />
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">
                <strong>Code:</strong> {{ product.code }}<br />
                <strong>Price:</strong> ${{ product.price }}<br />
                <strong>Stock:</strong> {{ product.stock }}
              </p>
              <div class="button-group">
              <button class="btn btn-danger btn-sm" @click="removeProduct(product.id)">Remove</button>
              <button class="btn btn-warning btn-sm" @click="editProduct(product)">Edit</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for adding a new product -->
    <div v-if="showAddProductModal" class="modal-overlay">
      <div class="modal-content">
        <h5>Add New Product</h5>
        <form @submit.prevent="addProduct">
          <div class="form-group">
            <label for="productName">Product Name</label>
            <input type="text" class="form-control" id="productName" v-model="newProduct.name" required />
          </div>
          <div class="form-group">
            <label for="productCode">Product Code</label>
            <input type="text" class="form-control" id="productCode" v-model="newProduct.code" required />
          </div>
          <div class="form-group">
            <label for="productPrice">Price</label>
            <input type="number" class="form-control" id="productPrice" v-model.number="newProduct.price" required />
          </div>
          <div class="form-group">
            <label for="productStock">Stock</label>
            <input type="number" class="form-control" id="productStock" v-model.number="newProduct.stock" required />
          </div>
          <div class="form-group">
            <label for="productImage">Image</label>
            <input type="file" class="form-control" id="productImage" @change="onImageChange" required />
          </div>
          <div class="button-group">
          <button type="submit" class="btn btn-primary">Add Product</button>
          <button type="button" class="btn btn-secondary" @click="showAddProductModal = false">Cancel</button>
            </div>
        </form>
      </div>
    </div>

    <!-- Modal for editing a product -->
    <div v-if="showEditProductModal" class="modal-overlay">
      <div class="modal-content">
        <h5>Edit Product</h5>
        <form @submit.prevent="updateProduct">
          <div class="form-group">
            <label for="editProductName">Product Name</label>
            <input type="text" class="form-control" id="editProductName" v-model="editProductData.name" required />
          </div>
          <div class="form-group">
            <label for="editProductCode">Product Code</label>
            <input type="text" class="form-control" id="editProductCode" v-model="editProductData.code" required />
          </div>
          <div class="form-group">
            <label for="editProductPrice">Price</label>
            <input type="number" class="form-control" id="editProductPrice" v-model.number="editProductData.price" required />
          </div>
          <div class="form-group">
            <label for="editProductStock">Stock</label>
            <input type="number" class="form-control" id="editProductStock" v-model.number="editProductData.stock" required />
          </div>
          <div class="form-group">
            <label for="editProductImage">Image</label>
            <input type="file" class="form-control" id="editProductImage" @change="onEditImageChange" />
          </div>
          <div class="button-group">
          <button type="submit" class="btn btn-primary">Save Changes</button>
          <button type="button" class="btn btn-secondary" @click="showEditProductModal = false">Cancel</button>
        </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data() {
    return {
      newProduct: {
        name: '',
        code: '',
        price: 0,
        stock: 0,
        image: ''
      },
      editProductData: {},
      products: [],
      searchQuery: '',
      showAddProductModal: false,
      showEditProductModal: false
    };
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      const savedProducts = JSON.parse(localStorage.getItem('products'));
      if (savedProducts) {
        this.products = savedProducts;
      }
    },
    saveProducts() {
      localStorage.setItem('products', JSON.stringify(this.products));
    },
    addProduct() {
      const newProductId = Math.max(...this.products.map(product => product.id), 0) + 1;
      this.products.push({
        id: newProductId,
        name: this.newProduct.name,
        code: this.newProduct.code,
        price: this.newProduct.price,
        stock: this.newProduct.stock,
        image: this.newProduct.image
      });
      this.saveProducts();
      this.newProduct.name = '';
      this.newProduct.code = '';
      this.newProduct.price = '';
      this.newProduct.stock = '';
      this.newProduct.image = '';
      this.showAddProductModal = false;
      $('#addProductModal').modal('hide');
    },
    removeProduct(productId) {
      this.products = this.products.filter(product => product.id !== productId);
      this.saveProducts();
    },
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newProduct.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    onEditImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editProductData.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    editProduct(product) {
      this.editProductData = { ...product };
      this.showEditProductModal = true;
    },
    updateProduct() {
      const productIndex = this.products.findIndex(product => product.id === this.editProductData.id);
      if (productIndex !== -1) {
        this.products[productIndex] = { ...this.editProductData };
        this.saveProducts();
        this.showEditProductModal = false;
        $('#editProductModal').modal('hide');
      }
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => product.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  background-color: #f8f9fa; /* Warna latar belakang yang lebih cerah */
}

.card {
  /* width: 100%; */
  margin-bottom: 20px;
  font-size: 16px; /* Ukuran font yang sedikit lebih besar */
  background-color: #ffffff; /* Warna latar belakang kartu */
  border-radius: 10px; /* Sudut kartu yang lebih bulat */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Bayangan halus */
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Efek bayangan saat hover */
}

.card-img-top {
  max-height: 200px; /* Tinggi maksimum gambar yang lebih besar */
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.button-group {
  display: flex;
  justify-content: center; /* Pusatkan tombol */
  gap: 10px;
}

.btn-primary {
  background-color: #17a2b8; /* Warna biru cerah */
  border-color: #17a2b8;
}

.btn-primary:hover {
  background-color: #117a8b; /* Warna biru lebih gelap saat hover */
  border-color: #0e5f70;
}

@media (max-width: 992px) {
  .card {
    width: 30%; /* Lebar kartu di layar kecil */
  }
}

@media (max-width: 768px) {
  .card {
    width: 45%; /* Lebar kartu di layar sangat kecil */
  }
}

@media (max-width: 576px) {
  .card {
    width: 100%; /* Kartu memenuhi lebar di layar sangat kecil */
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7); /* Warna latar belakang overlay lebih gelap */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); /* Bayangan lebih jelas */
  max-width: 500px;
  /* width: 100%; */
}

.modal-content h5 {
  color: #17a2b8; /* Warna teks judul biru cerah */
}

.modal-content .form-control {
  border: 1px solid #ced4da;
  border-radius: 5px;
}

.modal-content .btn {
  border-radius: 5px;
}
</style>
