<template>
  <LoaderSpinner v-if="!clients.length || !hasClient" />
  <div v-else class="flex flex-col min-h-90% px-2 md:px-4">
    <h1 class="text-2xl text-gray-700 font-semibold mb-4">Create</h1>
    <p>{{ client.name }}</p>
    <div class="md:flex md:gap-2 md:mb-4">
      <div class="flex-1">
        <label for="workout-name" class="block text-sm font-medium text-gray-700">Workout name</label>
        <input
          id="workout_name"
          v-model.trim="workout.workoutName"
          type="text"
          name="workout-name"
          required
          class="py-1.5"
          :class="{
            'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500': $v.workout.workoutName.$error,
          }"
          @blur="$v.workout.workoutName.$touch"
        />
      </div>
      <div>
        <label for="start_date" class="block text-sm font-medium text-gray-700">Start date</label>
        <input
          id="start_date"
          v-model="workout.startDate"
          type="date"
          name="start_date"
          required
          class="py-1.5"
          :class="{
            'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500': $v.workout.startDate.$error,
          }"
          @blur="$v.workout.startDate.$touch"
        />
      </div>
      <div>
        <label for="end_date" class="block text-sm font-medium text-gray-700">End date</label>
        <input
          id="end_date"
          v-model="workout.endDate"
          type="date"
          name="end_date"
          class="py-1.5"
          :class="{
            'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500': $v.workout.endDate.$error,
          }"
          @blur="$v.workout.endDate.$touch"
        />
      </div>
      <div>
        <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          v-model="workout.status"
          name="status"
          class="py-1.5"
          :class="{
            'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500': $v.workout.status.$error,
          }"
          @blur="$v.workout.status.$touch"
        >
          <option v-for="status in statusList" :key="status.value" :value="status.value">
            {{ status.label }}
          </option>
        </select>
      </div>
    </div>

    <div class="relative">
      <label for="general-note" class="block text-sm font-medium text-gray-700">Workout note</label>
      <textarea
        id="general-note"
        name="general-note"
        v-model.trim="workout.generalNote"
        :maxlength="400"
        class="min-h-[75px] max-h-[200px]"
      />
      <p class="absolute right-2 -bottom-4 text-gray-600 font-semibold text-xs">
        {{ workout.generalNote.length }} / {{ textMaxLength }}
      </p>
    </div>

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
import { required } from 'vuelidate/lib/validators';
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
  data() {
    return {
      textMaxLength: 400,
      workout: {
        workoutName: '',
        startDate: '',
        endDate: '',
        status: 'on_hold',
        generalNote: '',
      },
      statusList: [
        { value: 'on_hold', label: 'On hold' },
        { value: 'active', label: 'Active' },
        { value: 'archived', label: 'Archived' },
      ],
    };
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
  validations: {
    workout: {
      workoutName: { required },
      startDate: { required },
      endDate: { required },
      status: { required },
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
