<template>
  <LoaderSpinner v-if="!clients.length || !hasClient" />
  <div v-else class="flex flex-col min-h-90% px-2 md:px-4">
    <h1 class="text-2xl text-gray-700 font-semibold mb-4">Create</h1>
    <p>{{ client.name }}</p>
    <div class="md:flex md:gap-2 md:mb-4">
      <div class="flex-1 min-w-[240px]">
        <label for="workout-name" class="block text-sm font-medium text-gray-700">Workout name</label>
        <input
          id="plan_name"
          v-model.trim="plan.planName"
          type="text"
          name="plan-name"
          required
          class="py-1.5"
          :class="{
            'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500': $v.plan.planName.$error,
          }"
          @blur="$v.plan.planName.$touch"
        />
      </div>
      <div class="max-w-[170px]">
        <label for="start_date" class="block text-sm font-medium text-gray-700">Start date</label>
        <input
          id="start_date"
          v-model="plan.startDate"
          type="date"
          name="start_date"
          required
          class="py-1.5"
          :class="{
            'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500': $v.plan.startDate.$error,
          }"
          @blur="$v.plan.startDate.$touch"
        />
      </div>
      <div class="max-w-[170px]">
        <label for="end_date" class="block text-sm font-medium text-gray-700">End date</label>
        <input
          id="end_date"
          v-model="plan.endDate"
          type="date"
          name="end_date"
          class="py-1.5"
          :class="{
            'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500': $v.plan.endDate.$error,
          }"
          @blur="$v.plan.endDate.$touch"
        />
      </div>
      <div class="min-w-[120px]">
        <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          v-model="plan.status"
          name="status"
          class="py-1.5"
          :class="{
            'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500': $v.plan.status.$error,
          }"
          @blur="$v.plan.status.$touch"
        >
          <option v-for="status in statusList" :key="status.value" :value="status.value">
            {{ status.label }}
          </option>
        </select>
      </div>
    </div>

    <div class="relative">
      <label for="general-note" class="block text-sm font-medium text-gray-700">Note</label>
      <textarea
        id="general-note"
        name="general-note"
        v-model.trim="plan.generalNote"
        :maxlength="400"
        class="min-h-[75px] max-h-[200px]"
      />
      <p class="absolute right-2 -bottom-4 text-gray-600 font-semibold text-xs">
        {{ plan.generalNote.length }} / {{ textMaxLength }}
      </p>
    </div>

    <br />
    <!-- Start with workout A -->
    <hr />
    <br />
    <div class="mb-3" v-for="(workout, index) in plan.workouts" :key="index">
      <p>Workout A</p>

      <div v-for="exercise in workout.exercises" :key="exercise.id" class="relative flex gap-2 max-w-[95%]">
        <div class="flex-1 min-w-[240px]">
          <p class="text-sm text-gray-600">Exercise</p>
          <input
            v-model.trim="exercise.name"
            class="py-1.5"
            type="text"
            name="exercise_name"
            id=""
            placeholder="name"
          />
        </div>
        <div class="flex-1 max-w-[72px]">
          <p class="text-sm text-gray-600">Sets</p>
          <input
            v-model.trim="exercise.sets"
            class="py-1.5 max-w-[72px]"
            type="text"
            name="exercise_sets"
            id=""
            placeholder="reps"
          />
        </div>
        <div class="flex-1 max-w-[72px]">
          <p class="text-sm text-gray-600">Reps</p>
          <input
            v-model.trim="exercise.reps"
            class="py-1.5 max-w-[72px]"
            type="text"
            name="exercise_reps"
            id=""
            placeholder="sets"
          />
        </div>
        <div class="flex-1 max-w-[72px]">
          <p class="text-sm text-gray-600">Weight</p>
          <input
            v-model.trim="exercise.weight"
            class="py-1.5 max-w-[72px]"
            type="text"
            name="exercise_weight"
            id=""
            placeholder="weight"
          />
        </div>

        <div class="absolute -right-10 top-5 mt-0.5 px-1 rounded-md hover:bg-purple-200">
          <button class="py-1" type="button" @click="handleEditWeight">
            <IconPencil />
          </button>
        </div>
      </div>
    </div>

    <!-- Button to add another exercise for this same workout A -->
    <Button label="Add exercise" @on-click="addExercise" />

    <hr />

    <!-- la em baixo add another button to add more workouts ex: Workout B Workout C etc-->
    <button type="button">Add Workout</button>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import Button from '@/components/Button.vue';
import LoaderSpinner from '@/components/LoaderSpinner.vue';
import IconPencil from '@/components/IconPencil.vue';

export default {
  components: { Button, LoaderSpinner, IconPencil },
  props: {
    id: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      textMaxLength: 400,
      plan: {
        planName: '',
        startDate: '',
        endDate: '',
        status: 'on_hold',
        generalNote: '',
        workouts: [
          {
            division: 'A',
            exercises: [
              {
                id: 'asdasdasd',
                name: '',
                sets: '',
                reps: '',
                weight: '',
              },
            ],
          },
        ],
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
    handleEditWeight(row) {
      console.log(row);
    },
    addExercise() {
      console.log('addExercise');
    },
  },
  validations: {
    plan: {
      planName: { required },
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
