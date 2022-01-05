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
            v-model="nom"
            class="form-control"
            id="nom"
            aria-describedby="emailHelp"
            placeholder="Saisez votre nom"
          />
        </div>
        <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            v-model="email"
            class="form-control"
            id="exampleInputEmail1"
            placeholder="Enter email"
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            v-model="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
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
};
</script>
