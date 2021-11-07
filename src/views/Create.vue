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

    <div class="relative mb-4">
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

    <!-- Start Workout looping -->

    <div v-for="(workout, index) in plan.workouts" :key="index" class="mb-3">
      <div>
        <div class="flex items-center justify-start">
          <p class="text-gray-800 uppercase mr-2">Workout {{ workout.division }}</p>
          <button type="button" @click="handleOpenModalDeleteWorkout(workout)">
            <IconTrash class="w-4 pb-0.5 text-purple-500" />
          </button>
        </div>

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
            <button class="py-1" type="button" @click="handleEditWeight(exercise)">
              <IconPencil />
            </button>
          </div>
        </div>

        <div class="flex justify-end max-w-[95%]">
          <!-- Button to add another exercise for this same workout  -->
          <Button class="mt-3" label="Add exercise" @on-click="addExercise(index)" />
        </div>
      </div>
    </div>
    <div v-if="canAddWorkout" class="flex">
      <select id="workout-select" v-model="availableWorkout" name="workout-select" class="py-1.5 w-16 mr-2">
        <option v-for="workout in availableWorkouts" :key="workout.value" :value="workout.value">
          {{ workout.label }}
        </option>
      </select>
      <Button label="Add Workout" @on-click="addWorkout" />
    </div>

    <Modal v-if="isDeleteWorkoutModalOpen">
      <template slot="content">
        <div class="flex items-center justify-between border-b-2 border-gray-100 pb-3 md:hidden">
          <button
            class="mr-2 py-2 px-2 border border-transparent rounded-md hover:bg-purple-100"
            @click="handleOpenModalDeleteWorkout"
          >
            <IconChevronLeft class="text-purple-700" />
          </button>
          <Button label="Confirm" @on-click="deleteWorkout" />
        </div>
        <div class="flex flex-col items-center justify-center m-auto h-5/6 md:block">
          <h2 class="text-red-500 text-lg mb-3">Warning</h2>
          <p class="text-gray-700 text-sm mb-6">
            Are you sure you want to delete this workout {{ selectedWorkout.division.toUpperCase() }}?
          </p>
          <div class="hidden md:flex justify-end items-center gap-x-2">
            <Button :is-link="true" label="Cancel" @on-click="handleCloseModalDeleteWorkout" />
            <Button label="Confirm" @on-click="deleteWorkout" />
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import { uid } from 'uid';
import { required } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import Modal from '@/components/Modal.vue';
import Button from '@/components/Button.vue';
import LoaderSpinner from '@/components/LoaderSpinner.vue';
import IconPencil from '@/components/IconPencil.vue';
import IconTrash from '@/components/IconTrash.vue';
import IconChevronLeft from '@/components/IconChevronLeft.vue';

export default {
  components: { Modal, Button, LoaderSpinner, IconPencil, IconTrash, IconChevronLeft },
  props: {
    id: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      isDeleteWorkoutModalOpen: false,
      selectedWorkout: null,
      availableWorkout: 'b',
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
                id: uid(),
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
    canAddWorkout() {
      return this.plan.workouts.length < 5 || this.availableWorkouts.length;
    },
    availableWorkouts() {
      const allWorkouts = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
        { value: 'c', label: 'C' },
        { value: 'd', label: 'D' },
        { value: 'e', label: 'E' },
      ];

      const usedWorkouts = this.plan.workouts.map((workout) => workout.division.toLowerCase());

      return allWorkouts.filter((el) => !usedWorkouts.includes(el.value));
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
    addExercise(index) {
      console.log('addExercise', uid(), index);
      this.plan.workouts[index];
    },
    handleOpenModalDeleteWorkout(index) {
      this.selectedWorkout = index;
      this.isDeleteWorkoutModalOpen = true;
    },
    handleCloseModalDeleteWorkout() {
      this.isDeleteWorkoutModalOpen = false;
    },
    addWorkout() {
      if (this.canAddWorkout) {
        this.plan.workouts.push({
          division: this.availableWorkout,
          exercises: [
            {
              id: uid(),
              name: '',
              sets: '',
              reps: '',
              weight: '',
            },
          ],
        });

        // set the next available workout (if its available)
        this.availableWorkout = this.availableWorkouts[0]?.value;
      }
    },
    deleteWorkout() {
      const workoutDivision = this.selectedWorkout.division.toUpperCase();
      const filteredWorkouts = this.plan.workouts.filter(
        (workout) => workout.division !== this.selectedWorkout?.division
      );

      this.plan = {
        ...this.plan,
        workouts: filteredWorkouts,
      };

      if (this.availableWorkouts.length === 5) {
        this.availableWorkout = this.availableWorkouts[0]?.value;
      }

      this.$toast(`Workout ${workoutDivision} deleted`, {
        timeout: 2500,
      });
      this.handleCloseModalDeleteWorkout();
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
      handler(clientList) {
        if (clientList.length) this.findClient();
      },
    },
    canAddWorkout(newValue, oldValue) {
      // this is the case which the users comes from none availableWorkouts to at least 1 available.
      // Then we need to set the first one available
      if (newValue && !oldValue) {
        this.availableWorkout = this.availableWorkouts[0]?.value;
      }
    },
  },
};
</script>
