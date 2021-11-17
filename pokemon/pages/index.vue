<template>
  <div>
    <draggable
        v-model="team"  class="sticky top-0 bg-purple-500 grid grid-cols-6 gap-4"
        @start="dragging = true"
        @end="dragging = false">
      <div
        :id="index"
        @click="removePokemon(index)" v-for="(pokemon, index) in team" :key="index" class="cursor-pointer">
        <img :src="pokemon.sprite" alt="">
      </div>
    </draggable>
    <div class="justify-items-center text-center items-center">
      <h1 class="text-xl my-8">Pokédex generation 1</h1>
      <input v-model="search" placeholder="type pokemon name" class="mb-8 p-4 border-4 border-black rounded-lg">
      <div>{{ search }}</div>
      
      <div class="grid grid-cols-3 gap-4">
        <NuxtLink
          v-for="pokemon in filteredList"
          :key="pokemon.id"
          :to="pokemon.name"
          class="border-4 border-blue-500 border-opacity-100 rounded-lg w-full">
          <img :src="pokemon.sprites" class="m-auto">
          {{ pokemon.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      search: "",
      dragging: false,
    }
  },
   computed: {
    filteredList() {
      return this.pokemonList.filter(post => {
        return post.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    team: {
      get() {
        return this.$store.state.team.list;
      },
      set(value) {
        this.$store.commit('team/update', value);
      }
    }
  },
  methods: {
    removePokemon(index) {
      this.$store.commit('team/remove', index);
    },
  },
  async asyncData({ $axios }) {
    const pokemonApi = await $axios.$get('https://pokeapi.co/api/v2/pokemon?limit=151');
    const pokeDetails = pokemonApi.results.map((p) => $axios.$get(p.url));
    const result = await Promise.all(pokeDetails);
    const pokemonList = result.map((p) => {
      return {
      id: p.id,
      name: p.name,
      sprites: p.sprites.front_default,
    }
    });
    return { pokemonList };
  },
}
</script>
