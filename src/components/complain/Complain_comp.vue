<template>
<form class="review-form" @submit.prevent="onSubmit">
    <h3>Leave a review</h3>
    <label for="name">Name:</label>
    <input id="name" v-model="name">
    <label for="review">Review:</label>
    <textarea id="review" v-model="review"></textarea>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>

  <input class="button" type="submit" value="Submit">
</form>
</template>

<script>
export default {
  name: "complain_comp",
  data: () => ({
        name: '',
        review: '',
        rating: null
      }),
  methods: {
    onSubmit() {
      if (this.name === '' || this.review === '' || this.rating === null) {
        alert("smth is empty!!!")
        return
      }
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
      }

      this.$http.post("/chat", productReview)
          .then(response => {
              this.items = response.data.data.info;
              console.log(this.items);
          })
          .catch(error => {
          console.log(error)
          switch (error.response.status) {
              case 406:
                  break;
              case 401:
                  console.log('error!!');
                  break;
              default:
                  console.log('error55555555');
                  break;
          }
      }).finally(() => {
          setTimeout(() => {
              this.loading = false
          }, 500)
      })

      this.name = ''
      this.review = ''
      this.rating = null
    }
  }
}
</script>

<style scoped>
.review-form {
  display: flex;
  flex-direction: column;
  width: 425px;
  padding: 20px;
  margin: 40px;
  border: 2px solid #d8d8d8;
  background-color: white;
  -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 2px 15px -12px rgba(0, 0, 0, 0.57);
}
.review-container {
  width: 425px;
  padding: 20px;
  background-color: white;
  -webkit-box-shadow: 0px 2px 20px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 20px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 2px 20px -12px rgba(0, 0, 0, 0.57);
  margin-left: 40px;
  border: 2px solid #d8d8d8;
}

.review-container li {
  margin-bottom: 30px;
}

.review-form .button {
  display: block;
  margin: 30px auto;
}

input {
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
    border: 2px solid black;
}

label {
  font-size: 20px;
  margin-bottom: 5px;
}

select {
  height: 40px;
  font-size: 20px;
  border: 2px solid black;
  cursor: pointer;
}

textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 20px;
  margin-bottom: 20px;
  border: 2px solid black;
}

ul {
  list-style-type: none;
}
</style>