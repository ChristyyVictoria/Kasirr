<template>
    <v-app id="inspire">
        <SideBarLeft />
        <SideBarRigth />
    </v-app>
</template>

<script>
    import SideBarLeft from '../components/SideBarLeft.vue'
    import SideBarRight from '../components/SideBarRight.vue'

    export default {
        name: 'Home',

        components: {
            SideBarLeft,
            SideBarRight,
        },
    }
    </script>