<template>
    <fieldset>
        <legend>Add new friend</legend>
        <label>
            Name:
            <input v-model="friendName" type="text" />
        </label>
        <br />
        <label>
            Age:
            <input v-model="friendAge" type="number" />
        </label>
        <br />
        <button @click="addFriend">Add Friend</button>
        <p>{{ status }}</p>
    </fieldset>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { db } from '../../db'
export default defineComponent({
    name: 'FriendAdder'
})
</script>

<script setup lang="ts">
let status = ''
let friendName = ''
let friendAge = 21

const addFriend = async () => {
    try {
        // Add the new friend!
        const id = await db.friends.add({
            name: friendName,
            age: friendAge
        })

        status = `Friend ${friendName}
          successfully added. Got id ${id}`

        // Reset form:
        friendName = ''
        friendAge = 21
    } catch (error) {
        status = `Failed to add
          ${friendName}: ${error}`
    }
}