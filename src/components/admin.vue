<template>
  <div id="hello">
    <!-- 右下角的小猴子 -->
    <el-image :src="monkeyUrl" style=" position: fixed; right: 80px; bottom: 80px; z-index: 1"></el-image>
    <!-- 右上角发布按钮 -->
    <el-button
      type="warning"
      icon="el-icon-edit"
      circle
      @click="drawer_edit = true"
      style="height: 60px; width: 60px; position: fixed; right: 100px; top: 100px; z-index: 1"
    ></el-button>

    <!-- 发布帖子抽屉 -->
    <el-drawer title="发布公告" :visible.sync="drawer_edit" direction="ltr" size="60%">
      <div style="position: absolute; height:85%; overflow-y: auto;">
        <!-- 编辑抽屉的内容 -->
        <el-row type="flex" justify="center">
          <el-col :span="22">
            <div slot="header">
              <span style="font-family: 'Apple Braille'; font-size: 22px">🐵 发布公告</span>
            </div>
            <!-- 输入帖子标题及所属板块 -->
            <el-radio-group v-model="messageType" fill="#E6A23C">
              <el-radio-button label="普通公告"></el-radio-button>
              <el-radio-button label="重要公告"></el-radio-button>
            </el-radio-group>
            <br />
            <br />
            <el-input
              type="text"
              placeholder="请输入公告主题"
              v-model="articleTitle"
              maxlength="20"
              show-word-limit
            ></el-input>
            <br />
            <br />
            <!-- 富文本编辑器 -->
            <div class="editor">
              <quill-editor
                v-model="articleContent"
                ref="myQuillEditor"
                :options="editorOption"
                style="height: 450px"
              ></quill-editor>
            </div>

            <!-- 发布按钮 -->
            <el-button
              type="warning"
              style="position: relative; top: 100px; float: right"
              @click="releaseMessage"
            >发布</el-button>
            <br />
            <br />
          </el-col>
        </el-row>
      </div>
    </el-drawer>
    <!-- 欢迎页面 -->
    <el-drawer direction="ltr" :visible.sync="drawer" size="100%">
      <div
        style="font-family: 'Snell Roundhand','Times New Roman' ;text-align: right; position: relative"
        class="wow slideInLeft"
      >
        <span style="font-size: 300px">WEL</span>
        <br />
        <span style="font-size: 300px; position: relative; bottom: 100px">COME</span>
      </div>
    </el-drawer>

    <!-- 主页面在这里 -->
    <span>
      <!-- 抬头 -->
      <div style="text-align: center">
        <el-image :src="titleUrl" style="width: 100%"></el-image>
        <span
          style="font-family: 'Snell Roundhand','Times New Roman' ;font-size: 100px; position: relative; bottom: 20px; color: #8c939d"
        >Administrator</span>
      </div>
      <!-- 标签栏及内容 -->
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="数 据 管 理" name="first" style="font-family: 'Songti TC'">
                <span style="font-size: 40px">
                  原力论坛于
                  <span style="color: #E6A23C">2019年8月31日</span>建站
                </span>
                <br />
                <span style="font-size: 50px">
                  至今已提供了
                  <span style="color: #E6A23C">-1</span>天的服务
                </span>
                <br />
                <span style="font-size: 70px">
                  共有
                  <span style="color: #E6A23C">{{userNum}}</span>名注册用户
                </span>
                <br />
                <span style="font-size: 55px">
                  共发布了
                  <span style="color: #E6A23C">{{articleNum}}</span>个帖子
                </span>
                <br />
                <span style="font-size: 40px">这些其实都离不开大家的努力</span>
                <br />
                <span style="font-size: 180px">辛苦啦</span>
                <br />
              </el-tab-pane>
              <el-tab-pane label="帖 子 管 理" name="second">
                <template>
                  <el-table
                    ref="multipleTable"
                    :data="articleData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange1"
                  >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="日期" width="160">
                      <template slot-scope="date">{{ date.row.date|dateFormat }}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="用户名" show-overflow-tooltip width="120"></el-table-column>
                    <el-table-column prop="title" label="帖子主题" show-overflow-tooltip></el-table-column>
                    <el-table-column
                      prop="type"
                      label="所属板块"
                      fixed="right"
                      width="120"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      prop="floor"
                      label="楼层数"
                      fixed="right"
                      width="120"
                      show-overflow-tooltip
                    ></el-table-column>
                  </el-table>
                  <div style="margin-top: 20px; margin-bottom: 100px">
                    <el-button type="danger" @click="deleteArticle">删除主题</el-button>
                  </div>
                </template>
              </el-tab-pane>
              <el-tab-pane label="用 户 管 理" name="third">
                <template>
                  <el-table
                    ref="multipleTable"
                    :data="userData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange2"
                  >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="注册日期" width="200">
                      <template slot-scope="date">{{ date.row.date|dateFormat }}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="用户名" show-overflow-tooltip></el-table-column>
                    <!-- <el-table-column
                      prop="sum"
                      label="发布帖子总数"
                      fixed="right"
                      width="120"
                      show-overflow-tooltip
                    ></el-table-column> -->
                    <el-table-column
                      prop="ban"
                      label="禁言状态"
                      fixed="right"
                      width="120"
                      show-overflow-tooltip
                    ></el-table-column>
                  </el-table>
                  <div style="margin-top: 20px; margin-bottom: 100px">
                    <el-button type="danger" @click="setBan(1)">禁言用户</el-button>
                    <el-button @click="setBan(2)">解禁用户</el-button>
                  </div>
                </template>
              </el-tab-pane>
            </el-tabs>
          </template>
        </el-col>
      </el-row>
    </span>
  </div>
</template>

<script>
import { WOW } from "wowjs";
export default {
  name: "Main",
  data() {
    return {
      drawer: true,
      drawer_edit: false,
      activeName: "first",

      messageType: "",
      articleTitle: "",
      articleContent: "",

      userNum: 56,
      articleNum: 114514,

      editorOption: {
        theme: "snow"
      },

      articleData: [],
      userData: [],
      articleSelection: [],
      userSelection: [],

      logo_2Url: require("../assets/img/logo_ylbbs.png"),
      monkeyUrl: require("../assets/img/monkey1.png"),
      titleUrl: require("../assets/img/title.png")
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange1(val) {
      this.articleSelection = val;
    },
    handleSelectionChange2(val) {
      this.userSelection = val;
    },
    //发公告
    releaseMessage() {
      this.$http
        .post("/api/message/broadcast", {
          title: this.articleTitle,
          content: this.articleContent,
          sendTime: new Date(),
          type: this.messageType
        })
        .then(res => {
          this.$message({
            message: "发送成功",
            type: "success"
          });
          this.articleTitle = "";
          this.articleTitle = "";
          this.messageType = "";
        })
        .catch(function(err) {});
    },
    //禁言1or解禁2
    setBan(num) {
      if (num == 1) {
        for (var i = 0; i < this.userSelection.length; i++) {
          this.$http
            .post("/api/user/setSilence", {
              name: this.userSelection[i].name,
              ifBan: true
            })
            .then(res => {
              this.$message({
                message: "禁言成功",
                type: "success"
              });
            })
            .catch(function(err) {});
        }
      } else {
        for (var i = 0; i < this.userSelection.length; i++) {
          this.$http
            .post("/api/user/setSilence", {
              name: this.userSelection[i].name,
              ifBan: false
            })
            .then(res => {
              this.$message({
                message: "解禁成功",
                type: "success"
              });
            })
            .catch(function(err) {});
        }
      }
      this.getUser();
    },
    //删帖
    deleteArticle() {
      for (var i = 0; i < this.articleSelection.length; i++) {
        this.$http
          .post("/api/topic/deletetopic", {
            headline: this.articleSelection[i].title
          })
          .then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
          })
          .catch(function(err) {});
      }
      this.getArticle();
    },
    //获取帖子信息
    getArticle() {
      this.$http
        .post("/api/topic/showAll", {})
        .then(res => {
          console.log(res.data);
          this.articleData.splice(0, this.articleData.length);
          for (var i = 0; i < res.data.length; i++) {
            switch (res.data[i].topicType) {
              case "1":
                this.articleData.push({
                  date: res.data[i].topicDate,
                  name: res.data[i].starterName,
                  title: res.data[i].topicHeadline,
                  type: "课程推荐",
                  floor: res.data[i].topicFloor
                });
                break;
              case "2":
                this.articleData.push({
                  date: res.data[i].topicDate,
                  name: res.data[i].starterName,
                  title: res.data[i].topicHeadline,
                  type: "题目探讨",
                  floor: res.data[i].topicFloor
                });
                break;
              case "3":
                this.articleData.push({
                  date: res.data[i].topicDate,
                  name: res.data[i].starterName,
                  title: res.data[i].topicHeadline,
                  type: "校园周边",
                  floor: res.data[i].topicFloor
                });
                break;
              default:
                this.articleData.push({
                  date: res.data[i].topicDate,
                  name: res.data[i].starterName,
                  title: res.data[i].topicHeadline,
                  type: "未定",
                  floor: res.data[i].topicFloor
                });
                break;
            }
          }
          this.articleNum = this.articleData.length;
        })
        .catch(function(err) {});
    },
    //获取用户信息
    getUser() {
      this.$http
        .post("/api/user/show", {})
        .then(res => {
          this.userData.splice(0, this.userData.length);
          for (var i = 0; i < res.data.length; i++) {
            this.userData.push({
              date: res.data[i].registerTime,
              name: res.data[i].userName,
              sum: res.data[i].userArticleNum,
              ban: res.data[i].ban ? "是" : "否"
            });
          }
          this.userNum = this.userData.length;
        })
        .catch(function(err) {});
    }
  },
  mounted() {
    new WOW().init();
    this.getArticle();
    this.getUser();
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  filters: {
    dateFormat: function(datestr) {
      var dt = new Date(datestr);
      var y = dt.getFullYear();
      var m = (dt.getMonth() + 1).toString().padStart(2, "0");
      var d = dt.getDate();
      var hh = dt
        .getHours()
        .toString()
        .padStart(2, "0");
      var mm = dt
        .getMinutes()
        .toString()
        .padStart(2, "0");
      var ss = dt
        .getSeconds()
        .toString()
        .padStart(2, "0");
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    }
  }
};
</script>

<style scoped>
.router-link-active {
  text-decoration: none;
}

a {
  text-decoration: none;
}
</style>
