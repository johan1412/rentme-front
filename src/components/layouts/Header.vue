<template>
    <div class="header">
        <div class="header-title">RENTME</div>
        <ul>
            <li class="header-item"><router-link to="/login"><button>Publier une annonce</button></router-link></li>
            <li class="header-item"><router-link to="/login"><button>Ajouter une nouvelle catégorie</button></router-link></li>
            <li class="header-item"><router-link to="/login"><button>Annonce en attente de validation (0)</button></router-link></li>
            <li class="header-item"><router-link to="/login"><button>S'inscrire</button></router-link></li>
            <li class="header-item"><router-link to="/login"><button>Se connecter</button></router-link></li>
            <li class="header-item"><router-link to="/login"><button>Mon compte</button></router-link></li>
        </ul>
    </div>
</template>

<script>

export default {
  name: "Header",
  components: {
    
  },
};
</script>

<style scoped>
    .header {
        background-color: #ffffff;
        width: 100%;
        padding: 20px;
        border-bottom: 3px solid #000000;
    }
    .header ul {
        list-style: none;
        display: inline;
        text-align: right;
    }
    .header-title {
        font-family: 'Roboto';
        font-size: 270%;
        font-weight: 900;
        display: inline;
        text-align: left;
    }
    .header-item {
        display: inline;
    }
</style>