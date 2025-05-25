<script setup>
import { onMounted, reactive, ref } from 'vue';
import { addPost, getPosts } from '../services/post';
import Layout from '../components/Layout.vue';

const posts = ref([])
const new_post = reactive({"title": "", "text": ""})

async function createPost() {
    posts.value.push({...new_post})
    await addPost(new_post.title, new_post.text)

    new_post.title = ""
    new_post.text = ""
}

onMounted(async function() {
    posts.value = await getPosts()
})
</script>

<template>
    <Layout>
        <div class="container d-flex flex-column justify-content-center align-items-center">
            <div class="card"  style="width: 25rem;">
                <div class="card-body p-5">
                    <h1 class="card-title text-center mb-4">Новый пост</h1>
                    <form @submit.prevent="createPost">
                        <div class="mb-3">
                            <label for="title" class="form-label">Заголовок</label>
                            <input
                            id="title"
                            v-model="new_post.title"
                            type="text"
                            required
                            class="form-control"
                            placeholder="Тут заголовок"
                            />
                        </div>
                        <div class="mb-3">
                            <label for="text" class="form-label">Содержание</label>
                            <input
                            id="text"
                            v-model="new_post.text"
                            type="text"
                            required
                            class="form-control"
                            placeholder="А тут текст"
                            />
                        </div>
                        <button
                            type="submit"
                            class="btn btn-primary w-100 mt-3"
                        >Создать</button>
                    </form>
                </div>
            </div>
            <div class="card mt-4" style="width: 50rem;">
                <div class="card-body p-5">
                    <div class="card" v-for="p in posts">
                        <div class="card-body">
                            <p class="card-title">{{ p.title }}</p>
                            <span>{{ p.text }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>