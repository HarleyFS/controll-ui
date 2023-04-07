<template>
  <div class="main">
    <aside :class="isExpanded ? 'expanded' : ''">
      <div class="header">
        <i id="logo-icon" class="fas fa-brands fa-connectdevelop"></i>
        <!--<img class="logo" src="../assets/logo.svg" alt="logo" />-->
        <div id="title">Controll</div>
        <i
          id="expand-button"
          @click="expand"
          :class="isExpanded ? 'fas fa-angle-left' : 'fa-solid fa-bars'"
        ></i>
      </div>

      <div class="menu">
        <div id="itens-menu">
          <ul>
            <span v-for="(item, index) in menuItens" :key="index">
              <li>
                <router-link :to="item.link">
                  <i :class="item.icon"></i>
                  <span class="item-name">{{ item.name }}</span>
                </router-link>
              </li>
            </span>
          </ul>
        </div>

        <div class="profile">
          <div class="profile-details" v-show="isExpanded">
            <img src="../assets/logo.svg" />
            <div>
              <div id="logged-user-name">{{ "Harley Ferreira" }}</div>
              <div id="company">{{ "Clinica Controll" }}</div>
            </div>
          </div>
          <i class="fa-solid fa-right-from-bracket" id="logout-button"></i>
        </div>
      </div>
    </aside>

    <div class="card-body" :class="isExpanded ? '' : 'expanded'">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { PropType } from "vue";
import type ItensSideBar from "@/interfaces/ItensSideBar";

export default defineComponent({
  name: "SidebarComponent",

  props: {
    menuItens: {
      type: Array as PropType<Array<ItensSideBar>>,
      default: () => [
        {
          link: "/",
          name: "Dashboard",
          icon: "fa fa-home",
        },
        {
          link: "/agenda",
          name: "Agenda",
          icon: "fas fa-calendar",
        },
        {
          link: "/pacient",
          name: "Pacientes",
          icon: "fa fa-user-group",
        },
        {
          link: "/doctor",
          name: "Doutores",
          icon: "fas fa-user-doctor",
        },
        {
          link: "/about",
          name: "Documentos",
          icon: "fas fa-folder",
        },
        {
          link: "#",
          name: "Configurações",
          icon: "fas fa-gear",
        },
      ],
    },
  },

  setup(props) {
    const isExpanded = ref(false);

    const expand = () => {
      isExpanded.value = !isExpanded.value;
    };

    return {
      expand,
      isExpanded,
      props,
    };
  },
});
</script>

<style scoped>
.logo {
  width: 30px;
  margin: 0 10px 0 10px;
}

.menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  max-height: calc(100% - 60px);
}

#itens-menu {
  margin: 6px 14px 0 14px;
}

/* unexpanded sidebar */
aside {
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 78px;
  background: var(--primary);
  transition: all 0.5s ease;
  z-index: 99;
}

aside .header {
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
  margin: 6px 14px 0 14px;
}

aside .header .logo {
  opacity: 0;
  transition: all 0.5s ease;
}

aside #title {
  color: var(--light);
  font-size: 20px;
  font-weight: 600;
  opacity: 0;
}

aside .header #expand-button {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: 22px;
  transition: all 0.6s ease;
  text-align: center;
  cursor: pointer;
}

aside i {
  color: var(--light);
  min-width: 50px;
  font-size: 28px;
  text-align: center;
  line-height: 60px;
}

aside ul {
  margin-top: 20px;
}

aside li {
  margin: 8px 0;
}

aside li a {
  display: flex;
  border-radius: 12px;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
}

aside li a:hover {
  background: var(--light);
}

aside li a .item-name {
  color: var(--light);
  font-size: 15px;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0.4s;
}

aside li a:hover .item-name,
aside li a:hover i {
  transition: all 0.5s ease;
  color: #2daab8;
}

aside li i {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border-radius: 12px;
}

aside div.profile {
  position: relative;
  height: 60px;
  width: 78px;
  padding: 10px 14px;
  transition: all 0.5s ease;
  color: var(--light);
  white-space: nowrap;
}

aside div .profile-details {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

aside div img {
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 10px;
}

aside div.profile #logged-user-name {
  font-size: 15px;
}

aside div.profile #company {
  font-size: 12px;
}

aside .profile #logout-button {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: var(--primary);
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-radius: 0px;
  transition: all 0.5s ease;
  color: rgb(255, 255, 255);
}

aside .profile #logout-button:hover {
  color: rgb(255, 255, 255);
}

aside #logo-icon {
  opacity: 0;
  transition: all 0.5s ease;
}
/* end */

/* expanded sidebar */
aside.expanded {
  width: 250px;
}

aside.expanded .header .logo,
aside.expanded #title {
  opacity: 1;
}

aside.expanded .header #expand-button {
  text-align: right;
}

aside.expanded li a .item-name {
  opacity: 1;
  pointer-events: auto;
}

aside.expanded div.profile {
  width: 250px;
}

aside.expanded .profile #logout-button {
  width: 50px;
  background: var(--primary);
}

aside.expanded #logo-icon {
  opacity: 1;
  margin-right: 1rem;
}
/* end */

.main .card-body.expanded {
  padding-left: 80px;
}

@media (min-width: 960px) {
  .main .card-body {
    padding-left: 252px;
    transition: all 0.5s ease;
  }
}
</style>
