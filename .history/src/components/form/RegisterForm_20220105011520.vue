<template>
  <div class="container m-auto">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="firstName">Nom</label>
          <input
            type="text"
            v-model="firstName"
            class="form-control"
            id="firstName"
            aria-describedby="emailHelp"
            placeholder="Saisez votre nom"
          />
        </div>
        <div class="form-group">
          <label for="lastName">Prenom</label>
          <input
            type="text"
            v-model="lastName"
            class="form-control"
            id="lastName"
            placeholder="Saisez votre prénom"
          />
        </div>
        <div class="form-group">
          <label for="lastName">Addresse</label>
          <input
            type="text"
            v-model="address"
            class="form-control"
            id="address"
            placeholder="Saisez votre addresse"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            v-model="email"
            class="form-control"
            id="exampleInputEmail1"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
    firstName: "",
    lastName: "",
    address: "",
    firstName: "",
  }),
};
</script>
