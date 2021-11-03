<template>
  <LoaderSpinner v-if="!clients.length || !hasClient" />
  <div v-else class="flex flex-col min-h-90% px-2 md:px-4">
    <h1 class="text-2xl text-gray-700 font-semibold mb-4">Create</h1>
    <p>{{ client.name }}</p>
    <input class="py-1.5" type="text" name="" id="workout_name" placeholder="workout plan name" />
    <input class="py-1.5" type="date" name="start_date" id="" />
    <input class="py-1.5" type="date" name="start_date" id="" />
    <input type="date" name="end_date" id="" />
    <textarea placeholder="workout infos" />

    <br />
    <!-- Start with workout A -->
    <!-- Form with exercise name sets reps weight button to edit and delete row -->
    <hr />
    <br />
    <p>Workout A</p>

    <div class="flex gap-x-1">
      <input class="py-1.5" type="text" name="exercise_name" id="" placeholder="name" />
      <input class="py-1.5" type="text" name="exercise_sets" id="" placeholder="reps" />
      <input class="py-1.5" type="text" name="exercise_reps" id="" placeholder="sets" />
      <input class="py-1.5" type="text" name="exercise_weight" id="" placeholder="weight" />
      <button class="py-1" type="button">edit</button>
      <button class="py-1" type="button">delete</button>
    </div>

    <!-- Button to add another exercise for this same workout A -->
    <button type="button">Add exercise</button>

    <hr />

    <!-- la em baixo add another button to add more workouts ex: Workout B Workout C etc-->
    <button type="button">Add Workout</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LoaderSpinner from '@/components/LoaderSpinner.vue';

export default {
  components: { LoaderSpinner },
  props: {
    id: {
      type: String,
      require: true,
    },
  },
  computed: {
    ...mapState(['clients']),
    hasClient() {
      return this.clients.some((client) => client.id === this.id);
    },
  },
  methods: {
    findClient() {
      if (!this.hasClient) this.$router.push({ path: `/clients` });

      this.client = this.clients.find((client) => client.id === this.id);
    },
  },
  watch: {
    clients: {
      immediate: true,
      handler(c) {
        if (c.length) this.findClient();
      },
    },
  },
};
</script>
