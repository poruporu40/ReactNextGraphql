"use strict";(self.webpackChunknext_server=self.webpackChunknext_server||[]).push([[714],{"./src/stories/CustomButton.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,Secondary:()=>Secondary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>CustomButton_stories});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js");__webpack_require__("./node_modules/next/dist/compiled/react/index.js");const CustomButton=({label,onClick})=>(0,jsx_runtime.jsx)("button",{onClick,children:label}),components_CustomButton=CustomButton;CustomButton.__docgenInfo={description:"",methods:[],displayName:"CustomButton",props:{label:{required:!0,tsType:{name:"string"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const CustomButton_stories={title:"Example/CustomButton",component:components_CustomButton},Template=args=>(0,jsx_runtime.jsx)(components_CustomButton,{...args}),Primary=Template.bind({});Primary.args={label:"Primary Button"};const Secondary=Template.bind({});Secondary.args={label:"Secondary Button"};const __namedExportsOrder=["Primary","Secondary"];Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"args => <CustomButton {...args} />",...Primary.parameters?.docs?.source}}},Secondary.parameters={...Secondary.parameters,docs:{...Secondary.parameters?.docs,source:{originalSource:"args => <CustomButton {...args} />",...Secondary.parameters?.docs?.source}}}}}]);