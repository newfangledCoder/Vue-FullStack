<template>
    <div>
        <h1>Home</h1>
        <p>{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: "home",
    props: ["message"]
}
</script>