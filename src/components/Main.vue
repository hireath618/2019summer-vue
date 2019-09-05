<template>
  <div class="hello">
    <!-- 一些小部件们 -->
    <!-- 右下角的小猴子 -->
    <el-image
      :src="monkeyUrl"
      style=" position: fixed; right: 80px; bottom: 80px; z-index: 1"
      @click="jumpAdmin"
    ></el-image>
    <!-- 右上角发布按钮 -->
    <el-button
      type="warning"
      icon="el-icon-edit"
      circle
      @click="showEditor"
      style="height: 60px; width: 60px; position: fixed; right: 100px; top: 100px; z-index: 9000"
    ></el-button>
    <!-- 搜索按钮 -->
    <el-button
      type="warning"
      icon="el-icon-search"
      circle
      @click="drawer_search = true"
      style="height: 60px; width: 60px; position: fixed; right: 100px; top: 200px; z-index: 9000"
    ></el-button>
    <!-- 左下角分享图标们 -->
    <div style="position: fixed; left: 3%; bottom: 4%">
      <!-- 图标大小不一样 位置调了半天 哭辽 -->
      <img
        @click="shareTo('qzone')"
        src="http://zixuephp.net/static/images/qqzoneshare.png"
        width="32"
      />
      <img @click="shareTo('qq')" src="http://zixuephp.net/static/images/qqshare.png" width="32" />
      <img
        @click="shareTo('sina')"
        src="http://zixuephp.net/static/images/sinaweiboshare.png"
        width="36"
        style="position: relative; top: 2px"
      />
      <img
        @click="shareTo('wechat')"
        src="http://zixuephp.net/static/images/wechatshare.png"
        width="32"
      />
      <!-- 分享的时候需要准确的域名才能分享，localhost分享不了 或许部署上去就能分享了 -->
    </div>

    <!-- 抽屉们 -->
    <!-- 发布帖子抽屉 -->
    <el-drawer
      title="发布新的原力帖子"
      :visible.sync="drawer_edit"
      direction="ltr"
      size="60%"
      close-on-press-escape
    >
      <div style="position: absolute; height:85%; overflow-y: auto;">
        <!-- 编辑抽屉的内容 -->
        <el-row>
          <el-col :span="20" :offset="1">
            <div slot="header">
              <span style="font-family: 'Apple Braille'; font-size: 22px">发布新原力</span>
            </div>
            <!-- 输入帖子标题及所属板块 -->
            <el-radio-group v-model="typeValue" fill="#E6A23C" @change="setType()">
              <el-radio-button label="课程推荐"></el-radio-button>
              <el-radio-button label="题目探讨"></el-radio-button>
              <el-radio-button label="校园周边"></el-radio-button>
            </el-radio-group>
            <br />
            <br />
            <el-input
              type="text"
              placeholder="请输入帖子主题"
              v-model="article_title"
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
              @click="releaseArticle"
            >发布</el-button>
          </el-col>
        </el-row>
      </div>
    </el-drawer>

    <!-- 个人空间抽屉 -->
    <el-drawer
      title="我的原力"
      :visible.sync="drawer_user"
      direction="btt"
      size="80%"
      close-on-press-escape
    >
      <div style="position: absolute; width: 100%; height:85%; overflow-y: auto;">
        <!-- 编辑抽屉的内容 -->
        <el-row type="flex" justify="center">
          <el-col :span="22">
            <el-tabs
              v-model="activeName"
              @tab-click="handleClick"
              style="font-family: 'Arial Black'"
            >
              <el-tab-pane label="个人资料" name="first">
                <!-- 个人资料页的内容 -->
                <el-card
                  style="height: 400px; width: 700px;"
                  :style="{backgroundImage:'url(' + noiseUrl + ')'}"
                >
                  <div class="clearfix">
                    <span
                      style="font-family: 'PingFang SC';color: #E6A23C ; font-weight: bolder; font-size: 150px; position: relative; right: 40px; bottom: 50px"
                    >原力证</span>
                  </div>
                  <!-- 身份证卡片的内容(调位置调了一晚上 有的方向好像有限制 于是多加了一层div继续移动) -->
                  <!-- 可修改的头像 -->
                  <el-upload
                    :size="200"
                    style="float: right; position: relative; bottom: 200px; right: 20px "
                    action
                    accept="image/jpeg, image/png"
                    :on-change="onUploadChange"
                    :auto-upload="false"
                    :show-file-list="false"
                  >
                    <el-image v-if="!userAvatar" :src="avatarUrl" class="avatar"></el-image>
                    <el-image
                      v-else
                      :src="userAvatar"
                      style="position: relative; height: 150px ;width: 150px"
                      fit="fill"
                    ></el-image>
                    <!-- class="el-icon-plus avatar-uploader-icon" -->
                  </el-upload>
                  <br />
                  <!-- 右下⻆的数字 -->
                  <div style="position: relative; left: 140px; top: 20px">
                    <i
                      style="font-family: 'Snell Roundhand','Times New Roman'; color: #ffc500;float: right; font-size: 60px; font-weight: bold; position: relative; top: 50px"
                    >1145141919810</i>
                  </div>
                  <!-- 用户个人信息 -->
                  <div style="position: relative; bottom: 40px">
                    <nobr>
                      <span
                        style="font-size: 30px; font-weight: bold; position: relative; bottom: 120px"
                      >用户名：{{userName}}</span>
                    </nobr>
                    <br />
                    <br />
                    <span
                      style="font-size: 20px; position: relative; bottom: 130px"
                    >于{{userDate|dateFormat}}获得原力</span>
                    <br />
                    <span
                      style="font-size: 20px; position: relative; bottom: 130px"
                    >共发布过{{userArticleNum}}个原力帖</span>
                    <br />
                    <br />
                    <!-- 个性签名输⼊框 -->
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 1}"
                      maxlength="30"
                      placeholder="这个⼈有点懒，还没有编辑个性签名。"
                      style="font-family: PMingLiU; font-size: 20px; position: relative; bottom: 150px; border: none; background-color: transparent;"
                      v-model="userLog"
                    ></el-input>
                  </div>
                </el-card>
                <!-- 卡⽚旁边的修改密码按钮 -->
                <el-button
                  type="danger"
                  icon="el-icon-edit-outline"
                  style="position: relative; left: 750px; bottom: 50px"
                  round
                  @click="drawer_resetPassword = true"
                >修改原力密码</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-edit-outline"
                  style="position: relative; left: 750px; bottom: 50px"
                  round
                  @click="changeAvatar"
                >提交新头像！</el-button>
                <el-button
                  v-if="ifChangeLog"
                  icon="el-icon-edit-outline"
                  style="position: relative; right: 300px; bottom: 50px"
                  round
                  @click="changeLog"
                >提交新签名！</el-button>

                <el-row>
                  <el-col></el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="我的帖子" name="second">
                <!-- 我的帖子页的内容 -->
                <el-row>
                  <el-col :span="24" v-for="(value, index) in myArticleList" :key="index">
                    <!-- 这是⼀个帖⼦卡⽚，做成了⼀个巨⼤的botton -->
                    <el-row type="flex" align="middle">
                      <el-button
                        @click="showArticle(4, index)"
                        type="info"
                        plain
                        style="width: 100%; height: 60px; text-align: left"
                      >
                        <!-- 第⼀栏 放tags -->
                        <el-col :span="2" style="text-align: left">
                          <!-- 回复数tag -->
                          <el-tag type="warning">
                            <i class="el-icon-chat-dot-square"></i>
                            {{value.respectNum}}
                          </el-tag>
                        </el-col>
                        <!-- 第⼆栏 放⽂章标题 -->
                        <el-col :span="13">
                          <span style="font-size: 20px; ">{{value.title}}</span>
                        </el-col>
                        <!-- 第三栏 放发布⼈⽤户名 -->
                        <el-col :span="3">
                          <span style="font-weight: bolder">{{value.releaserName}}</span>
                        </el-col>
                        <!-- 第四栏 放最后回复时间 -->
                        <el-col :span="7" style="text-align: center">
                          <span>{{value.releaseDate|dateFormat}}</span>
                        </el-col>
                      </el-button>
                      <el-col :span="1">
                        <el-button icon="el-icon-delete" circle @click="deleteArticle(index)"></el-button>
                      </el-col>
                    </el-row>

                    <!-- 两个帖⼦之间的空隙 -->
                    <br />
                    <br />
                  </el-col>
                  <br />
                  <br />
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="我的消息" name="third">
                <!-- 我的消息⻚的内容 -->
                <el-row>
                  <el-col :span="24" v-for="(value, index) in myMessageList" :key="index">
                    <!-- 这是⼀个帖⼦卡⽚，做成了⼀个巨⼤的botton -->
                    <el-button
                      @click="showArticle(5, index)"
                      type="info"
                      plain
                      style="width: 100%; height: 60px; text-align: left"
                    >
                      <el-row type="flex" align="middle">
                        <!-- 第⼀栏 放tags -->
                        <el-col :span="2" style="text-align: left">
                          <!-- 已读/未读tag -->
                          <el-tag v-if="!value.ifRead" type="danger">
                            <i class="el-icon-view"></i>未读
                          </el-tag>
                          <el-tag v-if="value.ifRead">
                            <i class="el-icon-view"></i>已读
                          </el-tag>
                        </el-col>
                        <!-- 第⼆栏 消息内容 -->
                        <el-col :span="13">
                          <span style="font-size: 20px; ">{{value.message}}</span>
                        </el-col>
                        <!-- 第三栏 放发布人用户名 -->
                        <el-col :span="2">
                          <span style="font-weight: bolder">{{value.releaserName}}</span>
                        </el-col>
                        <!-- 第四栏 放消息时间 -->
                        <el-col :span="7" style="text-align: center">
                          <span>{{value.releaseDate | dateFormat}}</span>
                        </el-col>
                      </el-row>
                    </el-button>
                    <!-- 两个帖⼦之间的空隙 -->
                    <br />
                    <br />
                  </el-col>
                  <br />
                  <br />
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </div>
    </el-drawer>

    <!-- 登录抽屉 -->
    <el-drawer
      style="width: 30%; margin: 0 auto; text-align: center"
      title
      :visible.sync="drawer_login"
      direction="ttb"
      size="90%"
      close-on-press-escape
    >
      <span>
        <!-- logo -->
        <el-image :src="logo_2Url" style="width: 50%"></el-image>
        <br />
        <el-row type="flex" justify="center">
          <!-- 框框占抽屉的一半 -->
          <el-col :span="14">
            <br />
            <span style="font-family: 'Apple Braille'; font-size: 35px; font-weight: bolder">登 录</span>
            <br />
            <br />
            <br />
            <!-- 输入框们 -->
            <el-input
              type="text"
              placeholder="请输入原力账号"
              prefix-icon="el-icon-user"
              v-model="nameText"
              maxlength="16"
              show-word-limit
            ></el-input>
            <br />
            <br />
            <el-input
              placeholder="请输入原力密码"
              prefix-icon="el-icon-lock"
              v-model="passwordText"
              show-password
            ></el-input>
            <br />
            <br />
            <el-button type="warning" style="width: 100%" @click="login">释放原力</el-button>
            <br />
            <!-- 注册小提示+文字按钮 -->
            <span style="float: right">
              <span style="font-size: 12px">没有账号？</span>
              <el-button type="text" size="small" @click="drawer_regist=true">注册账号</el-button>
            </span>
          </el-col>
        </el-row>
      </span>
    </el-drawer>

    <!-- 注册抽屉 -->
    <el-drawer
      style="width: 30%; margin: 0 auto; text-align: center"
      title
      :visible.sync="drawer_regist"
      direction="ttb"
      size="90%"
      close-on-press-escape
    >
      <span>
        <!-- logo -->
        <el-image :src="logo_2Url" style="width: 50%"></el-image>
        <br />
        <el-row type="flex" justify="center">
          <!-- 框框占抽屉的一半 -->
          <el-col :span="14">
            <br />
            <span style="font-family: 'Apple Braille'; font-size: 35px; font-weight: bolder">注 册</span>
            <br />
            <br />
            <br />
            <!-- 输入框们 -->
            <el-form
              :model="ruleForm1"
              status-icon
              :rules="rules1"
              ref="ruleForm1"
              label-width="0px"
            >
              <el-form-item label prop="name">
                <el-input v-model="ruleForm1.name" placeholder="请输入原力账号" prefix-icon="el-icon-user"></el-input>
              </el-form-item>
              <el-form-item label prop="pass">
                <el-input
                  type="password"
                  v-model="ruleForm1.pass"
                  autocomplete="off"
                  placeholder="请输入原力密码"
                  prefix-icon="el-icon-lock"
                ></el-input>
              </el-form-item>
              <el-form-item label prop="checkPass">
                <el-input
                  type="password"
                  v-model="ruleForm1.checkPass"
                  autocomplete="off"
                  placeholder="请再次输入原力密码"
                  prefix-icon="el-icon-lock"
                ></el-input>
              </el-form-item>
              <br />
              <el-form-item>
                <el-button type="warning" @click="submitForm('ruleForm1')">获取原力</el-button>
                <el-button @click="resetForm('ruleForm1')">重置信息</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </span>
    </el-drawer>

    <!-- 修改密码抽屉 -->
    <el-drawer
      style="width: 30%; margin: 0 auto; text-align: center"
      title
      :visible.sync="drawer_resetPassword"
      direction="ttb"
      size="90%"
      close-on-press-escape
    >
      <span>
        <!-- logo -->
        <el-image :src="logo_2Url" style="width: 50%"></el-image>
        <br />
        <el-row type="flex" justify="center">
          <!-- 框框占抽屉的一半 -->
          <el-col :span="14">
            <br />
            <span style="font-family: 'Apple Braille'; font-size: 35px; font-weight: bolder">修改原力密码</span>
            <br />
            <br />
            <br />
            <!-- 输入框们 -->
            <el-form
              :model="ruleForm2"
              status-icon
              :rules="rules2"
              ref="ruleForm2"
              label-width="0px"
            >
              <el-form-item label prop="pass">
                <el-input v-model="ruleForm2.pass" placeholder="请输入原力密码" prefix-icon="el-icon-user"></el-input>
              </el-form-item>
              <el-form-item label prop="newpass">
                <el-input
                  type="password"
                  v-model="ruleForm2.newpass"
                  autocomplete="off"
                  placeholder="请输入新的原力密码"
                  prefix-icon="el-icon-lock"
                ></el-input>
              </el-form-item>
              <el-form-item label prop="checknewPass">
                <el-input
                  type="password"
                  v-model="ruleForm2.checknewPass"
                  autocomplete="off"
                  placeholder="请再次输入新的原力密码"
                  prefix-icon="el-icon-lock"
                ></el-input>
              </el-form-item>
              <br />
              <el-form-item>
                <el-button type="warning" @click="changePassword('ruleForm2')">修改密码</el-button>
                <el-button @click="resetForm('ruleForm2')">重置信息</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </span>
    </el-drawer>

    <!-- 帖子内容抽屉 -->
    <el-drawer :visible.sync="drawer_article" direction="ltr" size="80%" close-on-press-escape>
      <div style="position: absolute; height:85%; overflow-y: auto;">
        <!-- 抽屉的内容 -->
        <el-row type="flex" justify="center">
          <el-col :span="22">
            <!-- 这里用来放置帖子块 -->
            <!-- 这是帖子 -->
            <span
              style="font-size: 50px; font-weight: bold; margin-left: 20px; color: #66696e"
            >{{nowArticleTitle}}</span>
            <el-tag type="warning" style="margin-left: 20px">{{showNowArticle.type}}</el-tag>
            <el-divider></el-divider>
            <div>
              <el-row>
                <el-col :span="3">
                  <span style="text-align: center; font-size: 80px; color: #E6A23C">#{{1}}</span>
                </el-col>
                <el-col :span="3" style="text-align: center">
                  <el-avatar v-if="!showNowArticle.userAvatar" :size="100" :src="avatarUrl"></el-avatar>
                  <el-avatar v-else :size="100" :src="showNowArticle.userAvatar"></el-avatar>
                  <br />
                  <br />
                  <span style="font-family: PMingLiU; font-weight: bold">{{showNowArticle.userName}}</span>
                </el-col>
                <el-col :span="18">
                  <el-card>
                    <p v-html="showNowArticle.content"></p>
                  </el-card>
                  <br />
                  <span>{{showNowArticle.releaseDate | dateFormat}}</span>
                  <el-button
                    type="warning"
                    plain
                    round
                    style="float: right"
                    @click="likeArticle(0)"
                  >👍{{showNowArticle.zanNum}}</el-button>
                </el-col>
              </el-row>
            </div>
            <el-divider></el-divider>
            <!-- 获取评论 然后循环显示 -->
            <div v-for="(value, index) in showNowPost" :key="index">
              <div>
                <el-row>
                  <el-col :span="3">
                    <span style="text-align: center; font-size: 80px; color: #E6A23C">#{{index+2}}</span>
                  </el-col>
                  <el-col :span="3" style="text-align: center">
                    <el-avatar v-if="!value.userAvatar" :size="100" :src="avatarUrl"></el-avatar>
                    <el-avatar v-else :size="100" :src="value.userAvatar"></el-avatar>
                    <br />
                    <br />
                    <span style="font-family: PMingLiU; font-weight: bold">{{value.userName}}</span>
                  </el-col>
                  <el-col :span="18">
                    <el-card>
                      <p v-html="value.content"></p>
                    </el-card>
                    <br />
                    <span>{{value.releaseDate | dateFormat}}</span>
                    <!-- <el-button
                      type="warning"
                      plain
                      round
                      style="float: right"
                      @click="likeArticle(index+1)"
                    >👍{{value.zanNum}}</el-button> -->
                  </el-col>
                </el-row>
              </div>
              <el-divider></el-divider>
            </div>
            <div>
              <el-row>
                <el-col :span="3">
                  <span
                    style="text-align: center; font-size: 80px; color: #B4B4B4"
                  >#{{this.showNowPost.length+2}}</span>
                </el-col>
                <el-col :span="3" style="text-align: center">
                  <el-avatar v-if="!userAvatar" :size="100" :src="avatarUrl"></el-avatar>
                  <el-avatar v-else :size="100" :src="userAvatar"></el-avatar>
                  <br />
                  <br />
                  <span style="font-family: PMingLiU; font-weight: bold">{{this.userName}}</span>
                </el-col>
                <el-col :span="18">
                  <!-- 富文本编辑器 -->
                  <div class="editor">
                    <quill-editor
                      v-model="replyContent"
                      ref="myQuillEditor"
                      :options="editorOption"
                      style="height: 250px"
                    ></quill-editor>
                  </div>
                  <!-- 发布按钮 -->
                  <el-button
                    type="warning"
                    style="position: relative; top: 80px; float: right"
                    @click="replyArticle()"
                  >发布</el-button>
                  <br />
                  <br />
                </el-col>
              </el-row>
            </div>
            <el-divider></el-divider>
          </el-col>
        </el-row>
      </div>
    </el-drawer>

    <!-- 搜索抽屉 -->
    <el-drawer title="搜索帖子" :visible.sync="drawer_search" direction="ltr" size="80%">
      <div style="position: absolute; height:85%; overflow-y: auto;">
        <!-- 抽屉的内容 -->
        <el-row type="flex" justify="center">
          <el-col :span="22">
            <!-- 这里用来放置logo/搜索栏 -->
            <el-image :src="titleUrl" style="width: 100%"></el-image>
            <div style="margin-top: 15px;">
              <el-input placeholder="请输入内容" v-model="input_search" class="input-with-select">
                <el-select
                  v-model="select_search"
                  slot="prepend"
                  placeholder="请选择"
                  style="width:120px"
                >
                  <el-option label="课程推荐" value="1"></el-option>
                  <el-option label="题目探讨" value="2"></el-option>
                  <el-option label="校园周边" value="3"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="searchArticle"></el-button>
              </el-input>
            </div>
            <!-- 搜索到的帖子 -->
            <el-row>
              <el-col :span="24" v-for="(value, index) in searchList" :key="index">
                <br />
                <!-- 这是一个帖子卡片，做成了一个巨大的botton -->
                <el-button
                  @click="showArticle(6,index)"
                  type="info"
                  plain
                  style="width: 96%; height: 100px; text-align: left"
                >
                  <el-row type="flex" align="middle">
                    <!-- 第一栏 放tags -->
                    <el-col :span="2" style="text-align: left">
                      <!-- 回复数tag -->
                      <el-tag type="warning">
                        <i class="el-icon-chat-dot-square"></i>
                        {{value.respectNum}}
                      </el-tag>
                    </el-col>
                    <!-- 第二栏 放文章标题 -->
                    <el-col :span="13">
                      <span style="font-size: 20px; ">{{value.title}}</span>
                    </el-col>
                    <!-- 第三栏 放发布人用户名 -->
                    <el-col :span="2">
                      <span style="font-weight: bolder">{{value.releaserName}}</span>
                    </el-col>
                    <!-- 第四栏 放最后回复时间 -->
                    <el-col :span="7" style="text-align: center">
                      <span>{{value.releaseDate | dateFormat}}</span>
                    </el-col>
                  </el-row>
                </el-button>
                <!-- 两个帖子之间的空隙 -->
                <br />
              </el-col>
            </el-row>
            <br />
            <br />
          </el-col>
        </el-row>
      </div>
    </el-drawer>

    <!-- 主干部分 -->
    <el-row>
      <!-- 左侧导航栏 -->
      <el-col :span="4" style="position: fixed">
        <!-- logo -->
        <br />
        <br />
        <el-image :src="logo_2Url" style="width: 70%"></el-image>
        <br />
        <br />
        <el-divider>
          <i class="el-icon-monitor"></i>
        </el-divider>

        <!-- 主菜单 -->
        <el-menu
          :default-active="activeIndex"
          @select="handleSelect"
          active-text-color="#ffd04b"
          style="height: 280px; font-family: '微软雅黑';font-weight: bold; text-align: center"
        >
          <nav>
            <a class="nav1" v-for="(item, index) in navList" :key="index" @click="jump(index)">
              <el-menu-item :index="item.num.toString()">{{item.name}}</el-menu-item>
            </a>
          </nav>
          <br />
          <br />

          <el-submenu index="6" v-if="ifLogin">
            <template slot="title">
              <el-badge v-if="msgNum!=0" :value="msgNum" :max="99" class="item">
                <el-avatar
                  v-if="!userAvatar"
                  :size="50"
                  :src="avatarUrl"
                  @click.native="drawer_user = true"
                ></el-avatar>
                <el-avatar v-else :size="50" :src="userAvatar" @click.native="drawer_user = true"></el-avatar>
              </el-badge>
              <el-badge v-else>
                <el-avatar
                  v-if="!userAvatar"
                  :size="50"
                  :src="avatarUrl"
                  @click.native="drawer_user = true"
                ></el-avatar>
                <el-avatar v-else :size="50" :src="userAvatar" @click.native="drawer_user = true"></el-avatar>
              </el-badge>
            </template>
            <el-menu-item index="6-1" @click="drawer_user = true">我 的 原 力</el-menu-item>
            <el-menu-item index="6-2" @click="logout">注 销 原 力</el-menu-item>
          </el-submenu>

          <el-submenu index="7" v-if="!ifLogin">
            <template slot="title">
              <el-avatar :size="50" :src="initUrl" @click.native="drawer_login = true"></el-avatar>
            </template>
            <el-menu-item index="7-1" @click="drawer_login = true">登 录 原 力</el-menu-item>
            <el-menu-item index="7-2" @click="drawer_regist = true">注 册 原 力</el-menu-item>
          </el-submenu>

          <br />
        </el-menu>
      </el-col>

      <!-- 右侧文章导视 -->
      <el-col :span="20" style="float: right">
        <!-- 原力首页div -->
        <!-- 概念图片 -->
        <div class="wow slideInDown">
          <div class="section" :key="1">
            <el-image :src="homepage_1Url" style="width: 100%"></el-image>
          </div>
        </div>

        <!-- 课程推荐div -->
        <!-- 这里用来放课程推荐的标题 -->
        <div class="wow slideInLeft">
          <div class="section" :key="2" style="position: relative; bottom: 4px">
            <el-image style="width: 90%; float: left" :src="banner_kctjUrl"></el-image>
          </div>
        </div>
        <br />
        <el-row>
          <el-col :span="24" v-for="(value, index) in articleList1" :key="index">
            <br />
            <!-- 这是一个帖子卡片，做成了一个巨大的botton -->
            <el-button
              @click="showArticle(1,index)"
              type="info"
              plain
              style="width: 96%; height: 100px; text-align: left"
            >
              <el-row type="flex" align="middle">
                <!-- 第一栏 放tags -->
                <el-col :span="2" style="text-align: left">
                  <!-- 回复数tag -->
                  <el-tag type="warning">
                    <i class="el-icon-chat-dot-square"></i>
                    {{value.respectNum}}
                  </el-tag>
                </el-col>
                <!-- 第二栏 放文章标题 -->
                <el-col :span="13">
                  <span style="font-size: 20px; ">{{value.title}}</span>
                </el-col>
                <!-- 第三栏 放发布人用户名 -->
                <el-col :span="2">
                  <span style="font-weight: bolder">{{value.releaserName}}</span>
                </el-col>
                <!-- 第四栏 放最后回复时间 -->
                <el-col :span="7" style="text-align: center">
                  <span>{{value.releaseDate | dateFormat}}</span>
                </el-col>
              </el-row>
            </el-button>
            <!-- 两个帖子之间的空隙 -->
            <br />
          </el-col>
        </el-row>
        <!-- 翻页组件 -->
        <br />
        <div class="block" style="text-align: center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange1"
            :current-page.sync="currentPage1"
            hide-on-single-page
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="80"
          ></el-pagination>
        </div>
        <br />

        <div>
          <el-image :src="homepage_2Url" style="width: 100%"></el-image>
        </div>

        <!-- 题目探讨div -->
        <!-- 这里用来放题目探讨的标题 -->
        <div class="wow slideInLeft">
          <div class="section" :key="3" style="position: relative; bottom: 4px">
            <el-image style="width: 90%; float: left" :src="banner_tmttUrl"></el-image>
          </div>
        </div>
        <br />
        <el-row>
          <el-col :span="24" v-for="(value, index) in articleList2" :key="index">
            <br />
            <!-- 这是一个帖子卡片，做成了一个巨大的botton -->
            <el-button
              @click="showArticle(2,index)"
              type="info"
              plain
              style="width: 96%; height: 100px; text-align: left"
            >
              <el-row type="flex" align="middle">
                <!-- 第一栏 放tags -->
                <el-col :span="2" style="text-align: left">
                  <!-- 回复数tag -->
                  <el-tag type="warning">
                    <i class="el-icon-chat-dot-square"></i>
                    {{value.respectNum}}
                  </el-tag>
                </el-col>
                <!-- 第二栏 放文章标题 -->
                <el-col :span="13">
                  <span style="font-size: 20px; ">{{value.title}}</span>
                </el-col>
                <!-- 第三栏 放发布人用户名 -->
                <el-col :span="2">
                  <span style="font-weight: bolder">{{value.releaserName}}</span>
                </el-col>
                <!-- 第四栏 放最后回复时间 -->
                <el-col :span="7" style="text-align: center">
                  <span>{{value.releaseDate | dateFormat}}</span>
                </el-col>
              </el-row>
            </el-button>
            <!-- 两个帖子之间的空隙 -->
            <br />
          </el-col>
        </el-row>
        <!-- 翻页组件 -->
        <br />
        <div class="block" style="text-align: center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange2"
            hide-on-single-page
            :current-page.sync="currentPage2"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="80"
          ></el-pagination>
        </div>
        <br />

        <div>
          <el-image :src="homepage_3Url" style="width: 100%"></el-image>
        </div>

        <!-- 校园周边div -->
        <!-- 这里用来放校园周边的标题 -->
        <div class="wow slideInLeft">
          <div class="section" :key="4" style="position: relative; bottom: 4px">
            <el-image style="width: 90%; float: left" :src="banner_xyzbUrl"></el-image>
          </div>
        </div>
        <br />
        <el-row>
          <el-col :span="24" v-for="(value, index) in articleList3" :key="index">
            <br />
            <!-- 这是一个帖子卡片，做成了一个巨大的botton -->
            <el-button
              @click="showArticle(3,index)"
              type="info"
              plain
              style="width: 96%; height: 100px; text-align: left"
            >
              <el-row type="flex" align="middle">
                <!-- 第一栏 放tags -->
                <el-col :span="2" style="text-align: left">
                  <!-- 回复数tag -->
                  <el-tag type="warning">
                    <i class="el-icon-chat-dot-square"></i>
                    {{value.respectNum}}
                  </el-tag>
                </el-col>
                <!-- 第二栏 放文章标题 -->
                <el-col :span="13">
                  <span style="font-size: 20px; ">{{value.title}}</span>
                </el-col>
                <!-- 第三栏 放发布人用户名 -->
                <el-col :span="2">
                  <span style="font-weight: bolder">{{value.releaserName}}</span>
                </el-col>
                <!-- 第四栏 放最后回复时间 -->
                <el-col :span="7" style="text-align: center">
                  <span>{{value.releaseDate | dateFormat}}</span>
                </el-col>
              </el-row>
            </el-button>
            <!-- 两个帖子之间的空隙 -->
            <br />
          </el-col>
        </el-row>
        <!-- 翻页组件 -->
        <br />
        <div class="block" style="text-align: center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange3"
            :current-page.sync="currentPage3"
            hide-on-single-page
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="80"
          ></el-pagination>
        </div>
        <br />

        <!-- 关于原力div -->
        <div class="section" :key="5">
          <!-- 概念图片 -->
          <el-image :src="aboutUrl" style="width: 100%"></el-image>
          <el-image :src="footUrl" style="width: 100%; position: relative; bottom: 5px"></el-image>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { WOW } from "wowjs";
import { uploadImgToBase64 } from "../../static/js/utils"; // 导入本地图片转base64的方法

export default {
  name: "Main",
  data() {
    var checkname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      setTimeout(() => {
        if (value.length > 16) {
          callback(new Error("账号不得超过16个字符"));
        } else if (value.length < 6) {
          callback(new Error("账号不得短于6个字符"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length > 16) {
        callback(new Error("密码不得超过16个字符"));
      } else if (value.length < 6) {
        callback(new Error("密码不得短于6个字符"));
      } else {
        if (this.ruleForm1.checkPass !== "") {
          this.$refs.ruleForm1.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm1.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkpass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      setTimeout(() => {
        callback();
      }, 1000);
    };
    var validatenewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value.length > 16) {
        callback(new Error("密码不得超过16个字符"));
      } else if (value.length < 6) {
        callback(new Error("密码不得短于6个字符"));
      } else {
        if (this.ruleForm2.checknewPass !== "") {
          this.$refs.ruleForm2.validateField("checknewPass");
        }
        callback();
      }
    };
    var validatenewPass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.ruleForm2.newpass) {
        callback(new Error("两次输入的新密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      activeIndex: "1",
      activeName: "first",

      drawer_article: false, //文章抽屉的开关变量
      drawer_user: false, //注册抽屉的开关变量
      drawer_edit: false, //编辑抽屉的开关变量
      drawer_login: false, //登入抽屉的开关变量
      drawer_regist: false, //注册抽屉的开关变量
      drawer_resetPassword: false, //修改密码抽屉的开关变量
      msgNum: 0, //用户未读消息数

      currentPage1: 1,
      currentPage2: 1,
      currentPage3: 1,

      scroll: "", //双向锚点
      navList: [
        {
          name: "原 力 首 页",
          num: 1
        },
        {
          name: "课 程 推 荐",
          num: 2
        },
        {
          name: "题 目 探 讨",
          num: 3
        },
        {
          name: "校 园 周 边",
          num: 4
        },
        {
          name: "关 于 原 力",
          num: 5
        }
      ],

      drawer_search: false,
      input_search: "",
      select_search: "",

      articleList1: [],
      articleList2: [],
      articleList3: [],
      myArticleList: [],
      myMessageList: [],
      searchList: [],
      showNowArticle: {
        userAvatar: "",
        userName: "冷酷的土豆泥",
        content:
          "这里是帖子内容<br /><i>我裂开了</i><br />啊啊啊啊我裂开了<br />我永远喜欢小木曾雪菜<br />是我，是我先，明明都是我先来的……接吻也好，拥抱也好，还是喜欢上那家伙也好。为什么你会这么熟练啊！你和雪菜亲过多少次了啊！？你到底要把我甩开多远你才甘心啊！？<br />第一次,有了喜欢的人还得到了一生的挚友两份喜悦相互重叠这双重的喜悦又带来了更多更多的喜悦本应已经得到了梦幻一般的幸福时光然而,为什么,会变成这样<br />我们结婚吧！",
        releaseDate: new Date(),
        zanNum: 0,
        type: ""
      },
      showNowPost: [],

      nowArticleTitle: "", //帖子抽屉里的主题

      typeValue: "",
      article_title: "", //发帖的标题
      article_type: "1", //发帖的类型
      articleContent: ``,
      replyContent: ``,
      editorOption: {
        theme: "snow"
      },

      //这些是检查注册信息的
      ruleForm1: {
        name: "",
        pass: "",
        checkPass: ""
      },
      rules1: {
        name: [{ validator: checkname, trigger: "blur" }], //用户名
        pass: [{ validator: validatePass, trigger: "blur" }], //密码
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      submitResult: "", //获取后端检查注册信息结果
      //这些是重设密码的
      ruleForm2: {
        pass: "",
        newpass: "",
        checknewPass: ""
      },
      rules2: {
        pass: [{ validator: checkpass, trigger: "blur" }], //老密码
        newpass: [{ validator: validatenewPass, trigger: "blur" }], //新密码
        checknewPass: [{ validator: validatenewPass2, trigger: "blur" }]
      },
      nameText: "", //登录时的用户名栏
      passwordText: "", //登录时的密码栏

      checkResult: "", //获取后端信息结果 res.data

      ifLogin: false, //判断是否登录成功
      userName: "", //保存用户名
      userPassword: "", //保存密码
      userLog: "这个人比较懒，还没有编写签名。", //用户签名
      userDate: "", //用户注册日期
      userAvatar: "", //用户头像，为空时使用默认头像
      userArticleNum: 0, //用户已发布文章数
      ifAdmin: false, //判断用户是否是管理员
      ifBan: false, //判断用户是否被禁言
      ifRead: false, //判断用户是否阅读了新手上路
      ifChangeLog: false, //判断用户是否修改了签名

      initUrl: require("../assets/img/avatar.png"), //初始头像
      avatarUrl: require("../assets/img/monkey2.png"), //用户头像及默认头像存储
      changeUrl: "", //更换头像时暂时储存

      homepage_1Url: require("../assets/img/homepage.jpg"),
      homepage_2Url: require("../assets/img/homepage_2.jpg"),
      homepage_3Url: require("../assets/img/homepage_3.jpg"),
      logo_1Url: require("../assets/img/img_logo.png"),
      logo_2Url: require("../assets/img/logo_ylbbs.png"),
      banner_kctjUrl: require("../assets/img/banner_kctj.jpg"),
      banner_tmttUrl: require("../assets/img/banner_tmtt.jpg"),
      banner_xyzbUrl: require("../assets/img/banner_xyzb.jpg"),
      monkeyUrl: require("../assets/img/monkey1.png"),
      noiseUrl: require("../assets/img/noise.png"),
      footUrl: require("../assets/img/footer.png"),
      titleUrl: require("../assets/img/title.png"),
      aboutUrl: require("../assets/img/about.png"),
    };
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
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //关掉抽屉时灵魂拷问
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //翻页组件方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1(val) {
      this.getArticleList("1", val.toString());
    },
    handleCurrentChange2(val) {
      this.getArticleList("2", val.toString());
    },
    handleCurrentChange3(val) {
      this.getArticleList("3", val.toString());
    },

    jumpAdmin() {
      if (this.ifAdmin) {
        this.$router.push({ path: "/admin" });
      }
    },

    //登录用方法
    login() {
      this.$http
        .post("/api/user/login", {
          name: this.nameText,
          password: this.passwordText
        })
        .then(res => {
          this.checkResult = res.data;
          console.log(this.checkResult);
          if (this.checkResult.userName != null) {
            this.$message({
              message: "原力登录成功",
              type: "success"
            });
            this.ifLogin = true;
            this.userName = this.nameText;
            this.userPassword = this.passwordText;
            this.userLog = this.checkResult.userLog;
            this.ifChangeLog = false;
            this.userAvatar = this.checkResult.userAvatar;
            this.userArticleNum = this.checkResult.userArticleNum;
            this.userDate = this.checkResult.registerTime;
            this.ifAdmin = this.checkResult.admin;
            this.ifBan = this.checkResult.ban;
            this.ifRead = this.checkResult.read;
            this.drawer_login = false;
            this.getMyArticle();
            this.getMyMessage();
          } else {
            this.$message.error("账号或密码不符");
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //注册用方法
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("/api/user/register", {
              name: this.ruleForm1.name,
              password: this.ruleForm1.pass,
              time: new Date()
            })
            .then(res => {
              if (res.data.userName == null) {
                this.$message.error("该用户名已被注册！");
              } else {
                this.submitResult = res.data;
                this.$message({
                  message: "原力注册成功",
                  type: "success"
                });
                this.nameText = this.ruleForm1.name;
                this.passwordText = this.ruleForm1.pass;
                this.drawer_regist = false;
                this.drawer_login = true;
              }
            })
            .catch(function(err) {
              this.$message.error("提交注册信息失败");
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //修改密码
    changePassword(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("/api/user/resetpsw", {
              name: this.userName,
              oldpassword: this.ruleForm2.pass,
              newpassword: this.ruleForm2.newpass
            })
            .then(res => {
              if (res.data.userName == null) {
                this.$message.error("原密码输入错误！");
              } else {
                this.submitResult = res.data;
                this.$message({
                  message: "修改密码成功",
                  type: "success"
                });
                this.userPassword = this.ruleForm2.newpass;
                this.passwordText = this.ruleForm1.pass;
                this.drawer_resetPassword = false;
              }
            })
            .catch(function(err) {
              this.$message.error("提交修改信息失败");
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //修改签名
    changeLog() {
      this.$http
        .post("/api/user/resetlog", {
          name: this.userName,
          newlog: this.userLog
        })
        .then(res => {
          this.submitResult = res.data;
          this.$message({
            message: "修改签名成功",
            type: "success"
          });
          this.ifChangeLog = false;
        })
        .catch(function(err) {
          this.$message.error("提交修改信息失败");
          console.log(err);
        });
    },
    //修改头像
    changeAvatar() {
      var reader = new FileReader();
      reader.userName = this.userName;
      reader.readAsDataURL(this.changeUrl);
      reader.onload = function(e) {
        $.ajax({
          type: "post",
          url: "api/user/resetavatar",
          data: {
            name: this.userName,
            avatar: this.result.toString()
          },
          cache: false,
          jsonp: "callback",
          jsonpCallback: "success",
          dataType: "json",
          success: function(data) {
            alert("修改头像成功!");
          },
          error: function(msg) {
            alert("提交图片异常：" + msg);
          }
        });
      };
      this.getAvatar(this.userName);
    },
    onUploadChange(file) {
      const isIMAGE =
        file.raw.type === "image/jpeg" || file.raw.type === "image/png";
      const isLt1M = file.size / 1024 / 1024 < 2;

      if (!isIMAGE) {
        this.$message.error("上传文件只能是图片格式!");
        return false;
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 2 MB!");
        return false;
      }
      this.changeUrl = file.raw;
    },
    //登出方法
    logout() {
      this.ifLogin = false;
      this.userName = "";
      this.userPassword = "";
      this.userAvatar = "";
      this.ifAdmin = false;
      this.ifBan = false;
    },
    //展示文章
    showArticle(type, num) {
      if (!this.ifLogin) {
        this.$message({
          message: "您还没有登录",
          type: "warning"
        });
        return;
      } else {
        switch (type) {
          case 1:
            this.nowArticleTitle = this.articleList1[num].title;
            this.showNowArticle.userName = this.articleList1[num].releaserName;
            break;
          case 2:
            this.nowArticleTitle = this.articleList2[num].title;
            this.showNowArticle.userName = this.articleList2[num].releaserName;
            break;
          case 3:
            this.nowArticleTitle = this.articleList3[num].title;
            this.showNowArticle.userName = this.articleList3[num].releaserName;
            break;
          case 4:
            this.nowArticleTitle = this.myArticleList[num].title;
            this.showNowArticle.userName = this.userName;
            break;
          case 5:
            this.nowArticleTitle = this.myMessageList[num].title;
            this.showNowArticle.userName = this.myMessageList[num].releaserName;
            this.readMessage(num);
            break;
          case 6:
            this.nowArticleTitle = this.searchList[num].title;
            this.showNowArticle.userName = this.searchList[num].releaserName;
          default:
            break;
        }
        //获取主帖信息
        this.$http
          .post("/api/topic/getByHeadline", {
            headline: this.nowArticleTitle
          })
          .then(res => {
            console.log(res);
            if (res.data != null) {
              this.showNowArticle.content = res.data.topicContent;
              this.showNowArticle.releaseDate = res.data.topicDate;
              this.showNowArticle.zanNum = res.data.topicLikedNumber;
              switch (res.data.topicType) {
                case "1":
                  this.showNowArticle.type = "课程推荐";
                  break;
                case "2":
                  this.showNowArticle.type = "题目探讨";
                  break;
                case "3":
                  this.showNowArticle.type = "校园周边";
                  break;
              }
            } else {
              this.$message.error("获取帖子信息失败");
            }
          })
          .catch(function(err) {
            console.log(err);
          });
        //获取回复信息
        this.showNowPost.splice(0, this.showNowPost.length);
        this.$http
          .post("/api/post/showposts", {
            headline: this.nowArticleTitle
          })
          .then(res => {
            console.log(res.data);
            if (res.data != null) {
              for (var i = 0; i < res.data.length; i++) {
                this.showNowPost.push({
                  userName: res.data[i].postUser,
                  content: res.data[i].postContent,
                  releaseDate: res.data[i].postDate,
                  zanNum: res.data[i].postLikedNumber
                });
              }
            } else {
              this.$message.error("获取帖子信息失败");
            }
          })
          .catch(function(err) {
            console.log(err);
          });
        //获取所有的头像
        this.$http
          .post("/api/user/finduser", {
            name: this.showNowArticle.userName
          })
          .then(res => {
            console.log(res);
            if (res.data != null) {
              this.showNowArticle.userAvatar = res.data.userAvatar;
            } else {
              this.$message.error(
                "查找不到: " + this.showNowArticle.userName + " 相关信息"
              );
            }
          })
          .catch(function(err) {
            console.log(err);
          });
        this.drawer_article = true;
      }
    },
    //获得消息
    getMyMessage() {
      this.$http
        .post("/api/message/myMessage", {
          receiver: this.userName
        })
        .then(res => {
          console.log(res.data);
          this.myMessageList.splice(0, this.myMessageList.length);
          this.msgNum = 0;
          if (res.data != null) {
            for (var i = 0; i < res.data.length; i++) {
              this.myMessageList.push({
                ifRead: res.data[i].read,
                title: res.data[i].title,
                message: res.data[i].content,
                releaserName: res.data[i].sender,
                releaseDate: res.data[i].sendTime
              });
              if (!res.data[i].read) {
                this.msgNum++;
              }
            }
          } else {
            this.$message.error("获取信息失败");
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //已读消息
    readMessage(index) {
      this.$http
        .post("/api/message/setIsRead", {
          receiver: this.userName,
          sendTime: this.myMessageList[index].releaseDate
        })
        .then(res => {
          console.log(res.data);
          if (res.data) {
          } else {
            this.$message.error("更新未读信息失败");
          }
        })
        .catch(function(err) {
          console.log(err);
        });
      this.getMyMessage();
    },
    //展示编辑文本框
    showEditor() {
      if (!this.ifLogin) {
        this.$message({
          message: "您还没有登录",
          type: "warning"
        });
        return;
      } else {
        this.drawer_edit = true;
      }
    },
    //发布文章
    setType() {
      switch (this.typeValue) {
        case "课程推荐":
          this.article_type = "1";
          break;
        case "题目探讨":
          this.article_type = "2";
          break;
        case "校园周边":
          this.article_type = "3";
          break;
        default:
          this.article_type = "1";
          break;
      }
    },
    releaseArticle() {
      if (this.ifBan) {
        this.$message.error("您已被管理员禁言！");
      } else {
        this.$http
          .post("/api/topic/release", {
            topicHeadline: this.article_title,
            starterName: this.userName,
            topicContent: this.articleContent,
            date: new Date(),
            type: this.article_type
          })
          .then(res => {
            console.log(res.data);
            if (res.data.topicHeadline != null) {
              this.$message({
                message: "发帖成功",
                type: "success"
              });
              this.getMyArticle();
              this.article_title = "";
              this.articleContent = "";
              this.typeValue = "";
              this.drawer_edit = false;
            } else {
              this.$message.error("已有同名帖，请修改帖子标题");
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    //搜索帖子
    searchArticle() {
      this.$http
        .post("/api/topic/searchtopic", {
          headline: this.input_search,
          type: this.select_search
        })
        .then(res => {
          console.log(res.data);
          this.searchList.splice(0, this.searchList.length);
          for (var i = 0; i < res.data.length; i++) {
            this.searchList.push({
              title: res.data[i].topicHeadline,
              releaserName: res.data[i].starterName,
              respectNum: res.data[i].topicFloor,
              releaseDate: res.data[i].topicDate
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //删除帖子
    deleteArticle(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("/api/topic/deletetopic", {
              headline: this.myArticleList[index].title
            })
            .then(res => {
              console.log(res.data);
              if (res.data) {
                this.$message({
                  message: "删帖成功",
                  type: "success"
                });
                this.getMyArticle();
              } else {
                this.$message.error("上传删除信息失败");
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //获取主页list
    getArticleList(type, page) {
      this.$http
        .post("/api/topic/show", {
          page: page,
          type: type
        })
        .then(res => {
          if (res.data != null) {
            switch (type) {
              case "1":
                this.articleList1.splice(0, this.articleList1.length);
                for (var i = 0; i < res.data.length; i++) {
                  this.articleList1.push({
                    title: res.data[i].topicHeadline,
                    releaserName: res.data[i].starterName,
                    respectNum: res.data[i].topicFloor,
                    releaseDate: res.data[i].topicDate
                  });
                }
                break;
              case "2":
                this.articleList2.splice(0, this.articleList2.length);
                for (var i = 0; i < res.data.length; i++) {
                  this.articleList2.push({
                    title: res.data[i].topicHeadline,
                    releaserName: res.data[i].starterName,
                    respectNum: res.data[i].topicFloor,
                    releaseDate: res.data[i].topicDate
                  });
                }
                break;
              case "3":
                this.articleList3.splice(0, this.articleList3.length);
                for (var i = 0; i < res.data.length; i++) {
                  this.articleList3.push({
                    title: res.data[i].topicHeadline,
                    releaserName: res.data[i].starterName,
                    respectNum: res.data[i].topicFloor,
                    releaseDate: res.data[i].topicDate
                  });
                }
                break;
            }
          } else {
            this.$message.error("获取文章列表失败");
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //获取用户发过的帖子
    getMyArticle() {
      this.$http
        .post("/api/topic/showmytopic", {
          username: this.userName
        })
        .then(res => {
          console.log(res.data);
          if (res.data != null) {
            this.myArticleList.splice(0, this.myArticleList.length);
            for (var i = 0; i < res.data.length; i++) {
              this.myArticleList.push({
                title: res.data[i].topicHeadline,
                releaserName: res.data[i].StarterName,
                respectNum: res.data[i].topicLikedNumber,
                releaseDate: res.data[i].topicDate
              });
            }
            this.userArticleNum = this.myArticleList.length;
          } else {
            this.$message.error("获取用户帖子信息失败");
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //回复文章
    replyArticle() {
      if (this.ifBan) {
        this.$message.error("您已被管理员禁言！");
      } else {
        this.$http
          .post("/api/post/release", {
            headline: this.nowArticleTitle,
            user: this.userName,
            content: this.replyContent,
            date: new Date()
          })
          .then(res => {
            console.log(res.data);
            if (res.data != null) {
              this.$message({
                message: "回复成功",
                type: "success"
              });
              this.showNowPost.push({
                userAvatar:
                  this.userAvatar != null ? this.userAvatar : this.avatarUrl,
                userName: res.data.postUser,
                content: res.data.postContent,
                releaseDate: res.data.postDate,
                zanNum: res.data.postLikedNumber
              });
              this.replyContent = "";
            } else {
              this.$message.error("信息上传失败");
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    //点赞第index+1层内容
    likeArticle(index) {
      if (index == 0) {
        this.$http
          .post("/api/topic/likeTopic", {
            headline: this.nowArticleTitle
          })
          .then(res => {})
          .catch(function(err) {
            console.log(err);
          });
          this.showNowArticle.zanNum++;
      } else {
        this.$http
          .post("/api/post/likePost", {
            headline: this.nowArticleTitle,
            floor: index + 1
          })
          .then(res => {})
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    //根据用户名获得头像
    getAvatar(uname) {
      this.$http
        .post("/api/user/finduser", {
          name: uname
        })
        .then(res => {
          if (res.data != null) {
            this.userAvatar = res.data.userAvatar;
          } else {
            this.$message.error("查找不到相关用户信息");
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //分享，目前有问题
    shareTo(stype) {
      var ftit = "";
      var flink = "";
      var lk = "";
      //获取文章标题
      ftit = $(".pctitle").text();
      //获取网页中内容的第一张图片
      flink = $(".pcdetails img")
        .eq(0)
        .attr("src");
      if (typeof flink == "undefined") {
        flink = "";
      }
      //当内容中没有图片时，设置分享图片为网站logo
      if (flink == "") {
        lk = "http://" + window.location.host + "/static/images/logo.png";
      }
      //如果是上传的图片则进行绝对路径拼接
      if (flink.indexOf("/uploads/") != -1) {
        lk = "http://" + window.location.host + flink;
      }
      //百度编辑器自带图片获取
      if (flink.indexOf("ueditor") != -1) {
        lk = flink;
      }
      //qq空间接口的传参
      if (stype == "qzone") {
        window.open(
          "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" +
            document.location.href +
            "?sharesource=qzone&title=" +
            ftit +
            "&pics=" +
            lk +
            "&summary=" +
            document
              .querySelector('meta[name="description"]')
              .getAttribute("content")
        );
      }
      //新浪微博接口的传参
      if (stype == "sina") {
        window.open(
          "http://service.weibo.com/share/share.php?url=" +
            document.location.href +
            "?sharesource=weibo&title=" +
            ftit +
            "&pic=" +
            lk +
            "&appkey=2706825840"
        );
      }
      //qq好友接口的传参
      if (stype == "qq") {
        window.open(
          "http://connect.qq.com/widget/shareqq/index.html?url=" +
            document.location.href +
            "?sharesource=qzone&title=" +
            ftit +
            "&pics=" +
            lk +
            "&summary=" +
            document
              .querySelector('meta[name="description"]')
              .getAttribute("content") +
            "&desc=php自学网，一个web开发交流的网站"
        );
      }
      //生成二维码给微信扫描分享，php生成，也可以用jquery.qrcode.js插件实现二维码生成
      if (stype == "wechat") {
        window.open(
          "http://zixuephp.net/inc/qrcode_img.php?url=http://zixuephp.net/article-1.html"
        );
      }
    },

    //双向锚点
    dataScroll: function() {
      this.scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
    },
    jump(index) {
      let jump = document.getElementsByClassName("section");
      // 获取需要滚动的距离
      let total = jump[index].offsetTop;
      // Chrome
      document.body.scrollTop = total;
      // Firefox
      document.documentElement.scrollTop = total;
      // Safari
      window.pageYOffset = total;
    },
    loadSroll: function() {
      var self = this;
      var $navs = $(".nav1");
      var sections = document.getElementsByClassName("section");
      for (var i = sections.length - 1; i >= 0; i--) {
        if (self.scroll >= sections[i].offsetTop - 100) {
          $navs
            .eq(i)
            .addClass("current")
            .siblings()
            .removeClass("current");
          break;
        }
      }
    }
  },
  watch: {
    scroll: function() {
      this.loadSroll();
    },
    userLog: function(newValue, oldValue) {
      this.ifChangeLog = true;
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },

  mounted() {
    window.addEventListener("scroll", this.dataScroll);
    new WOW().init();

    this.getArticleList("1", "1");
    this.getArticleList("2", "1");
    this.getArticleList("3", "1");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 15px;
  float: right;
  position: relative;
  right: 20px;
  top: 30px;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.IDcard {
  background-color: #dadada;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-select .el-input {
  width: 130px;
}

.router-link-active {
  text-decoration: none;
}

a {
  text-decoration: none;
}

/* .nav1 {
  display: block;
  height: 40px;
  text-align: center;
  line-height: 40px;
  margin: 10px;
} */
.current {
  color: #ffd04b;
  background: rgb(235, 245, 255);
  height: 100%;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>
