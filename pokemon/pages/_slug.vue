<template>
  <div class="flex flex-col justify-center text-center items-center">
     <h1>{{ pokemonInformations.name }}</h1>
     <div>
       <span v-for="(poke, index) in filterSprites" :key="index">
            <img :src="poke" class="inline">
       </span>
    </div>
    <p>height: {{ pokemonInformations.height }}</p>
    <p>type(s):
    <span v-for="(type, index) in pokemonInformations.types" :key="index">
      <span v-if="index !== 0">, </span>{{ type.type.name }}
    </span>
    </p>
    <button @click="addteam" class="mt-4 bg-green-500 p-4 rounded-lg text-white">button add</button>
    <NuxtLink to="./" class="mt-4 bg-red-500 p-4 rounded-lg text-white">return to pokedex</NuxtLink >
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      team: 'team/team',
    }),
    filterSprites() {
      return Object.fromEntries(Object.entries(this.pokemonInformations.sprites).filter(([_, v]) => v && typeof v === 'string'));
    },
  },
  methods: {
    addteam(e) {
      if (this.team.length === 6) {
        alert("you cannot add pokemon anymore, your team is full !");
        return;
      }
      this.$store.commit('team/add', { id: this.pokemonInformations.id, name: this.pokemonInformations.name, sprite: this.pokemonInformations.sprites.front_default } );
      // alert(this.pokemonInformations.name + "has been added to your team !");
    }
  },
  async asyncData({ $axios, params }) {
    const pokemonInformations = await $axios.$get('https://pokeapi.co/api/v2/pokemon/' + params.slug);
    return { pokemonInformations };
  },
}
</script>
