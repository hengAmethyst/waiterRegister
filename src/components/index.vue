<template>
	<div class="index">
		<!--顶部空白-->
		<div class="space"></div>
		<!--输入区域-->
		<div class="inputs">
			<!--name-->
			<div class="inputName">
				<input type="text" placeholder="请输入真实姓名" v-model="name"/>
			</div>
			<!--phone-->
			<div class="inputPhoneNumber">
				<input type="text" placeholder="请输入手机号" maxlength="11" v-model="phoneNumber"/>
			</div>
			<!--验证码-->
			<div class="inputCheckNumber">
				<input type="text" placeholder="请输入验证码" maxlength="6" v-model="checkNum"/>
				<span v-if="checkTrue">获取验证码</span>
				<span @click="checkNumber" v-if="allowCheckClick&!checkTrue">获取验证码</span>
				<span v-if="!allowCheckClick&!checkTrue">{{time}}s</span>
			</div>
			<!--验证码提示-->
			<div class="warn-checkNumber">
				<p>请在60s内完成验证，超时请点击重新发送</p>
			</div>
		</div>
		<!--提交按钮-->
		<div class="submit">
			<p ref="submitBtn" @click="ifEnter">注 册</p>
		</div>
	</div>
</template>
<script>
import {splitUserInfo,getURLParam} from '../js/splitInfoTwo.js'
import $ from 'n-zepto'
import cookie from '../js/cookie.js'
	export default{
		data(){
			return{
				//姓名
				name:'',
				//手机号
				phoneNumber:'',
				//验证码
				checkNum:'',
				//验证码是否可点，默认为不可点
				checkTrue:true,
				//时间
				time:60,
				//允许跳转
				allowCheckClick:true,
				//nameAllow
				nameAllow:false,
				//phoneAllow
				phoneAllow:false,
				//checkAllow
				checkAllow:false,
				//总体填完后允许点击注册
				allow:false,
				rewardId:null,
				openId:'',
				headImgUrl:'',
				nickName:'',
				http:'https://reward.jinghanit.com'
			}
		}
		,
		methods:{
			//判断是否可以跳转
			ifEnter(){
				//是否允许请求
				if(this.allow){
					//register
					this.$http.post(this.http+"/jinghan-reward/waiterRewardCards/register",
						JSON.stringify({
							"rewardId":this.rewardId,
							"realName":this.name,
							"phoneNumber":this.phoneNumber,
							'openId':this.openId,
							'headImgUrl':this.headImgUrl,
							'nickName':this.nickName,
							"smsCode":this.checkNum
						})
					,{emulateJSON:true})
					.then(function(res){
						if(res.body.code !=0){
							alert(res.body.msg)
						}
						else{
							if(this.$refs.submitBtn.className){
								this.$router.push({path:'/succeed'})
							}
						}
					})
				}
			},
			//获取验证码
			checkNumber(){
				this.allowCheckClick = false
				var that = this
				let timer = setInterval(function(){
					that.time = that.time - 1
					if(that.time==0){
						clearInterval(timer)
						that.allowCheckClick = true
						that.time = 60
					}
				},1000)
				//获取验证码
				this.$http.post(this.http+"/jinghan-reward/waiterRewardCards/sendSmsCode",
					JSON.stringify({"phoneNumber":this.phoneNumber})
				,{emulateJSON:true})
				.then(function(res){
					console.log(res)
				})
			}
		}
		,
		created(){
			let localUrl = window.location.href
			if(localUrl.indexOf('openId')<0){
				//取赏牌Id
				this.rewardId = JSON.stringify(getURLParam('rewardId',localUrl)) 
				//将赏牌Id储存在本地
				$.fn.cookie('rewardId', this.rewardId , { expires: 1 })
				//去取openId
//				window.location.href="https://pay.jinghanit.com/jinghan-payment/api/h5/index/wxTest?returnUrl=http://h5.jinghanit.com/waiterregister"
				window.location.href="https://pay.jinghanit.com/jinghan-payment/api/h5/index/wxTest?returnUrl=http://192.168.2.120:8070"
			}
			else{
				this.openId = getURLParam('openId',localUrl)
				this.headImgUrl = getURLParam('headimgurl',localUrl)
				this.nickName = getURLParam('nickName',localUrl)
				this.rewardId = JSON.parse($.fn.cookie('rewardId'))
			}
		}
		,
		watch:{
			//监控名字
			name(){
				if(this.name!=''){
					this.nameAllow = true
					if(this.phoneAllow&this.checkAllow){
						this.allow = true
						this.$refs.submitBtn.className = 'btn-active'
					}
				}
				else{
					this.$refs.submitBtn.className = ''
					this.nameAllow = false
					this.allow = false
				}
				
			},
			//手机号监控
			phoneNumber(){
				if(this.phoneNumber.length==11){
					this.checkTrue = false
					this.phoneAllow = true
					if(this.nameAllow&this.checkAllow){
						this.allow = true
						this.$refs.submitBtn.className = 'btn-active'
					}
				}
				else{
					this.$refs.submitBtn.className = ''
					this.phoneAllow = false
					this.allow = false
				}
			},
			//验证码
			checkNum(){
				if(this.checkNum.length == 6){
					this.checkAllow = true
					if(this.nameAllow&this.phoneAllow){
						this.allow = true
						this.$refs.submitBtn.className = 'btn-active'
					}
				}
				else{
					this.$refs.submitBtn.className = ''
					this.checkAllow = false
					this.allow = false
				}
			}
		}
	}
</script>
<style lang="scss">
	.index{
		position:fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		background:#f9f9f9;
		z-index: 3002;
		.space{
			width:100%;
			height:0.1rem;
			background:#f9f9f9;
		}
		/*输入区域*/
		.inputs{
			width:100%;
			margin-top:0.2rem;
			/*输入姓名*/
			.inputName{
				width:100%;
				height:0.5rem;
				input{
					width:100%;
					height:100%;
					padding-left:0.15rem;
					font-size:0.15rem;
					color:#282828;
					border:none;
				}
			}
			/*输入手机号*/
			.inputPhoneNumber{
				width:100%;
				height:0.5rem;
				margin-top:0.01rem;
				input{
					width:100%;
					height:100%;
					padding-left:0.15rem;
					font-size:0.15rem;
					color:#282828;
					border:none;
				}
			}
			/*输入验证码*/
			.inputCheckNumber{
				position:relative;
				width:100%;
				height:0.5rem;
				margin-top:0.01rem;
				input{
					width:100%;
					height:100%;
					padding-left:0.15rem;
					font-size:0.15rem;
					color:#282828;
					border:none;
				}
				span{
					position:absolute;
					top:16%;
					right:0.2rem;
					display:flex;
					width:0.9rem;
					height:0.3rem;
					justify-content:center;
					align-items:center;
					font-size:0.15rem;
					color: #31C4C3;
					border: 2px solid #31C4C3;
				}
			}
			/*验证码超时提示*/
			.warn-checkNumber{
				width:100%;
				height:0.4rem;
				p{
					margin-left:0.15rem;
					line-height: 0.3rem;
					font-size:0.13rem;
					color: #6A6A6A;
				}
			}
		}
		/*提交按钮*/
		.submit{
			display:flex;
			justify-content: center;
			width:100%;
			height:0.41rem;
			margin-top:0.2rem;
			p{
				width:3.4rem;
				height:100%;
				text-align: center;
				line-height: 0.41rem;
				font-size:0.18rem;
				color:#fff;
				background: #B4B4B4;
				border-radius: 6px;
			}
			.btn-active{
				background: #31C4C3 !important;
			}
		}
	}
</style>