//////
function main(){
var cs  = document.getElementById('canv1');
var ctx = cs.getContext('2d');
ctx.clearRect(0, 0, cs.width, cs.height);
var mask = document.getElementById('mask').value;
var arr1 = [];
var arr_notdata = [];
var arr_data = [];
var settei;
//settei = [1,21,[6+1]];
//settei = [2,25,[6+1,18+1]];
//settei = [3,29,[6+1,22+1]];
//settei = [4,33,[6+1,26+1]];
//settei = [5,37,[6+1,30+1]];
//settei = [6,41,[6+1,34+1]];
//settei = [7,45,[6+1,22+1,38+1]];
//settei = [8,49,[6+1,24+1,42+1]];
//settei = [9,53,[6+1,26+1,46+1]];
settei = [10,57,[6+1,28+1,50+1]];
//settei = [11,61,[6+1,30+1,54+1]];
//settei = [12,65,[6+1,32+1,58+1]];
//settei = [13,69,[6+1,34+1,62+1]];
//settei = [14,73,[6+1,26+1,46+1,66+1]];
//settei = [15,77,[6+1,26+1,48+1,70+1]];
const SZ = settei[1]; 
var arr_ichi = settei[2]; 
for(var j=0; j<SZ; j++){
	arr1[j] = [];
	arr_notdata[j] = [];
	arr_data[j] = [];
	for(var i=0; i<SZ; i++){
		arr1[j][i] = 0;
		arr_notdata[j][i] = 0;
		arr_data[j][i] = 0;
	}
}
//位置検出パターン：左上
for(var j=0; j<=6; j++){
	for(var i=0; i<=6; i++){
		if(j==0 || j==6 || i==0 || i==6 || ((i>=2 && i<=4)&&(j>=2 && j<=4))){
		arr1[j][i] = 1;
		}
	}
}
//位置検出パターン：右上
xi = SZ-7;
for(var j=0; j<=6; j++){
	for(var i=0+xi; i<=6+xi; i++){
		if(j==0 || j==6 || i==0+xi || i==6+xi || ((i>=2+xi && i<=4+xi)&&(j>=2 && j<=4))){
		arr1[j][i] = 1;
		}
	}
}
//位置検出パターン：左下
yj = SZ-7;
for(var j=0+yj; j<=6+yj; j++){
	for(var i=0; i<=6; i++){
		if(j==0+yj || j==6+yj || i==0 || i==6 || ((i>=2 && i<=4)&&(j>=2+yj && j<=4+yj))){
		arr1[j][i] = 1;
		}
	}
}
//arr_notdata
for(j=0;j<SZ;j+=1){
	for(i=0;i<SZ;i+=1){
		//位置検出パターンと、タイミングパターン
		if((j<=8 && i<=8) || 
		   (i>=SZ-8 && j<=8) ||
		   (j>=SZ-8 && i<=8) ||
		   (i==6) ||
		   (j==6)
		 ){
		arr_notdata[j][i] = 1;
		}
		//タイミングパターン模様塗り//xx/
		if(
		   (j==6 && i>=8 && i<=SZ-8 && (i%2==0)) ||
		   (i==6 && j>=8 && j<=SZ-8 && (j%2==0)) 
		 ){
			arr1[j][i] = 1;
		}
		//7型以上の型番情報
		if((SZ>=45) && 
			(
		   (i<6 && j<=SZ-8-1 && j>=SZ-8-3) ||
		   (j<6 && i<=SZ-8-1 && i>=SZ-8-3)
			)
		 ){
		arr_notdata[j][i] = 1;
		}
	}
}
//位置合わせパターン
for(j=0;j<SZ;j+=1){ //*1
	for(i=0;i<SZ;i+=1){ //*2
for( var ii=0; ii<arr_ichi.length; ii++) { //*3
	for( var jj=0; jj<arr_ichi.length; jj++) { //*4
	if((ii==0&&jj==0)||(ii==0&&jj==arr_ichi.length-1)||(ii==arr_ichi.length-1&&jj==0)){
	}else{
		ichi_i = arr_ichi[ii] ;
		ichi_j = arr_ichi[jj] ;
			if(
			((j>=ichi_j-1-2 && j<=ichi_j-1+2) &&
			 (i>=ichi_i-1-2 && i<=ichi_i-1+2)) 
			 ){
				arr_notdata[j][i] = 1;
				//位置合わせパターンの模様塗り//xx/
				arr1[j][i] = 1;
				if(
				((j>=ichi_j-1-1 && j<=ichi_j-1+1) &&
				 (i>=ichi_i-1-1 && i<=ichi_i-1+1)) 
				 ){
					arr1[j][i] = 0;
					if(j==ichi_j-1 && i==ichi_i-1){
						arr1[j][i] = 1;
					}
				}//xx/
			}
	}
	} //*4
} //*3
	} //*2
} //*1
ctx.fillStyle = 'black';
var rd = 8;
var mgn = 0;
for(j=0;j<SZ;j+=1){
	for(i=0;i<SZ;i+=1){
	//規格では、横方向がjで、縦方向がi
	//ij逆になっている
		//マスクの適用。data欄のみ。
		if(arr_notdata[j][i]!='1'){
	/*
	000	(i+j) mod 2 = 0
	001	i mod 2 = 0
	010	j mod 3 = 0
	011	(i+j) mod 3 = 0
	100	(( i div 2)+(j div 3)) mod 2 = 0
	101	 (ij) mod 2 + (ij) mod 3 = 0
	110	((ij) mod 2 + (ij) mod 3) mod 2 = 0
	111	((ij) mod 3 + (i+j) mod 2) mod 2 = 0
	*/
			switch (mask){
			case "000":
				if((i+j)%2==0){
					arr_data[j][i] = 1;//arr_data[j][i]^1;
				}
				break;
			case "001":
				if((j%2)==0){ //ij逆
					arr_data[j][i] = 1;//arr_data[j][i]^1;
				}
				break;
			case "010":
				if((i)%3==0){ //ij逆
					arr_data[j][i] = 1;//arr_data[j][i]^1;
				}
				break;
			case "011":
				if((i+j)%3==0){
					arr_data[j][i] = 1;//arr_data[j][i]^1;
				}
				break;
			case "100":
				if(((j/2|0)+(i/3|0))%2==0){ //ij逆
					arr_data[j][i] = 1;//arr_data[j][i]^1;
				}
				break;
			case "101":
				if(((i*j)%2 + (i*j)%3)==0){
					arr_data[j][i] = 1;//arr_data[j][i]^1;
				}
				break;
			case "110":
				if((((i*j)%2 + (i*j)%3)%2)==0){
					arr_data[j][i] = 1;//arr_data[j][i]^1;
				}
				break;
			case "111":
				if((((i*j)%3 + (i+j)%2)%2)==0){
					arr_data[j][i] = 1;//arr_data[j][i]^1;
				}
				break;
			default:
			}
		}
	}
}
for(j=0;j<SZ;j+=1){
	for(i=0;i<SZ;i+=1){
		//NOT data欄の確認
		if(arr_notdata[j][i]=='1'){
			ctx.fillStyle = '#FF0';
			ctx.fillRect(30+i*rd, 30+j*rd, rd-mgn, rd-mgn);
		}else{
		}
		//３か所の位置検出パターン等の配置
		if(arr1[j][i]=='1'){
			ctx.fillStyle = '#00F';
			ctx.fillRect(30+i*rd, 30+j*rd, rd-mgn, rd-mgn);
		}else{
		}
		//data欄の配置
		if(arr_data[j][i]=='1'){
			ctx.fillStyle = 'black';
			ctx.fillRect(30+i*rd, 30+j*rd, rd-mgn, rd-mgn);
		}else{
		}
	}
}
}//////
