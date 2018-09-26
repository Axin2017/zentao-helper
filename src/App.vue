<template>
    <div id="app">
        <header>
            <main-header />
        </header>
        <main>
            <router-view/>
        </main>
        <footer class="footer">
        </footer>
    </div>
</template>

<script>
import MainHeader from '@/components/public/Header';
export default {
    name: 'App',
    components: {
        MainHeader
    }
};
</script>

<style>
#app {
    font-size: 13px;
    margin: 0 auto;
    color: #333;
}

::-webkit-scrollbar-track {
    background-color: #f8f8f8;
}
::-webkit-scrollbar {
    width: 6px;
    height: 9px;
}
::-webkit-scrollbar-thumb {
    background-color: #ccc;
    background-clip: padding-box;
    min-height: 28px;
}
::-webkit-scrollbar-thumb:hover {
    background-color: #bbb;
}
body {
    overflow-y: scroll;
}
</style>
