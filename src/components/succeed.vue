<template>
	<div class="succeed">
		<div class="header">
			<img src="../assets/注册顶部@3x.png" class="img1"/>
			<img src="../assets/成功@3x.png" class="img2"/>
			<p>
				<span>您已成为海底捞万达店的服务员</span>
				<span>关注公众号可进行更多操作</span>
			</p>
		</div>
	</div>
</template>
<script>
	
</script>
<style lang="scss">
	.succeed{
		position:fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		z-index: 3002;
		.header{
			position:relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			width:100%;
			height:1.3rem;
			.img1{
				width:100%;
				height:100%;
			}
			.img2{
				position:absolute;
				bottom:0%;
				left:50%;
				transform: translateX(-0.375rem);
				width:0.75rem;
				height:0.75rem;
			}
			p{
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top:0.3rem;
				span:nth-child(1){
					font-size:0.2rem;
					color:#EE5A32;
				}
				span:nth-child(2){
					display:inline-block;
					margin-top:0.125rem;
					font-size:0.16rem;
					color: #A0A0A0;
				}
			}
		}
		
	}
</style>