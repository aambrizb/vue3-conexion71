<style scoped>

  .div-items {
    max-height: 150px;
    overflow:auto;
    position:absolute;
    top:35px;
    left:0px;
    background-color:white;
    border:solid 1px #c4c4c4;
    border-radius:10px;
    z-index:999999;
    width:100%;
  }

 .items {
   list-style: none;
   margin:0px;
   padding:10px;
 }

 .item {
   cursor:pointer;
 }

 .selected {
   background-color:#f2f2f2;
   font-weight: bold;
 }

</style>
<template>
  <div class="row">
    <input :id="'id_'+props.name" type="hidden" :name="props.name" v-model="pk" />
    <div class="col-lg-1 col-md-1 col-sm-12 col-xs-12 fw-bold">
      {{ props.label }}
    </div>
    <div :class="JSON.parse(show_create) || JSON.parse(show_edit) ? 'col-lg-9 col-md-9 col-sm-9 col-xs-12':'col-lg-10 col-md-10 col-sm-10 col-xs-12' ">
      <div style="position:relative;">
        <input type="text" class="form-control" :placeholder="props.placeholder"
               @focus="show_div = true"
               @blur="blur_input"
               @keyup="press"
               v-model="search"
        />
        <div class="div-items" v-if="show_div">
          <ul class="items">
            <li class="item" :class="item.class_item" v-for="item,index in filtered_items" @click="setItem(index);" @mouseover="overItem(index);">
              {{ item[props.label_field] }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-lg-1 col-md-1 col-sm-12 col-xs-12">
      <span class="fa fa-plus-circle text-primary m-1 core_create_edit" v-if="JSON.parse(props.show_create)" :data-app="app" :data-model="model" :data-form_class="props.form_class" style="cursor:pointer;"></span>
      <span class="fa fa-edit text-success m-1 core_create_edit" v-if="JSON.parse(props.show_edit)" :data-form_class="props.form_class" @click="edit()" style="cursor:pointer;"></span>
    </div>
  </div>
  <div class="row" v-if="props.help_text">
    <div class="col-lg-1 col-md-1 col-sm-12 col-xs-12"></div>
    <div class="col-lg-11 col-md-11 col-sm-12 col-xs-12">
      <i style="font-size: 12px;color:gray;">{{ help_text }}</i>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted, watch } from 'vue'

const props = defineProps([
    'name',
    'label',
    'placeholder',
    'app',
    'method',
    'label_field',
    'id_field',
    'help_text',
    'show_create',
    'show_edit',
    'form_class',
    'pk'
]);

const emit = defineEmits(['changed']);

defineExpose({
  setPK
})


const app            = ref(null);
const model          = ref(null);

const search         = ref(null);
const items          = ref([]);
const filtered_items = ref([]);
const last_index     = ref(null);
const selected       = ref(null);
const show_div       = ref(false);
const pk             = ref(null);

onMounted(() => {

  if (
      props.name === undefined ||
      props.app === undefined ||
      props.method === undefined ||
      props.label_field === undefined
  ) {
    return;
  }

  if (props.pk !== undefined) {
    pk.value = props.pk;
  }

  document.addEventListener('created_edited',function(ev) {
    if (ev.detail.base_app === app.value && ev.detail.base_model === model.value) {
      removeModal('base','CreateEdit');
      pk.value = ev.detail.pk;
      refresh();
    }

  });

  refresh();

});

watch(search,(oldV,newV) => {
  filtered_items.value = items.value.filter((x) => x[props.label_field].includes(search.value));
  show_div.value = true;
});

function setPK(data_pk) {
  pk.value = data_pk;
  refresh();
}
const refresh = () => {

  HttpRequest(
      'GET',
      props.app,
      props.method
  ).then(function(data) {
    app.value            = data.app;
    model.value          = data.model;
    items.value          = data.data;
    filtered_items.value = items.value;

    if (pk.value !== undefined && pk.value !== null) {
      setTimeout(function() {
        let tmp_index = items.value.findIndex(x => String(x.id) === String(pk.value));

        if (tmp_index !== -1) {

          selected.value = items.value[tmp_index];
          search.value   = items.value[tmp_index][props.label_field];

          setTimeout(function() {
            show_div.value = false;
          },50);

        }
      },50);
    }

  });
};

const press = (ev) => {

  if (ev.keyCode === 38 || ev.keyCode === 40) {

    if (last_index.value === undefined || last_index.value === null) {
      last_index.value = 0;
      overItem(last_index.value);
      return;
    }

    if (ev.keyCode === 40 && last_index.value < filtered_items.value.length-1) {
      last_index.value += 1;
    }

    if (ev.keyCode === 38 && last_index.value > 0) {
      last_index.value -= 1;
    }

    overItem(last_index.value);
  }
  else if (ev.keyCode === 13) {
    setItem(last_index.value);
  }
  else if (ev.keyCode === 27) {
    show_div.value = false;
  }

};
const setItem = (index) => {
  search.value   = filtered_items.value[index][props.label_field];
  selected.value = filtered_items.value[index];
  pk.value       = selected.value.id;

  emit('changed',selected.value);

  setTimeout(function() {
    show_div.value = false;
  },50);

}

const overItem = (index) => {
  last_index.value = index;

  if (filtered_items.value.length === 0 || filtered_items.value[index] === undefined) {
    return;
  }

  filtered_items.value.forEach((e) => e.class_item = null);
  filtered_items.value[index].class_item = 'selected';
};

const edit = () => {
  showModal('base','CreateEdit',{
    base_app   : app.value,
    base_model : model.value,
    pk         : selected.value.id
  });
}

const blur_input = (ev) => {
  setTimeout(function() {
    show_div.value = false;

    if (selected.value === null || selected.value === undefined) {
      search.value = null;
    }
  },100);
};

</script>