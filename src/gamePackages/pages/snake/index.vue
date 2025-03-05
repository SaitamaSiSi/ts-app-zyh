<template>
    <view class="snake">
      <view class="content">
        <text class="score">得分：{{ score }}</text>
        <canvas canvas-id="gameCanvas" id="gameCanvas" class="game-canvas"></canvas>
        <button class="start-btn" @tap="startGame">{{ gameStatus ? '重新开始' : '开始游戏' }}</button>
        <view class="control-btns">
          <button class="direction-btn up" @tap="handleDirectionChange('up')">↑</button>
          <button class="direction-btn down" @tap="handleDirectionChange('down')">↓</button>
          <button class="direction-btn left" @tap="handleDirectionChange('left')">←</button>
          <button class="direction-btn right" @tap="handleDirectionChange('right')">→</button>
        </view>
      </view>
    </view>
</template>

<script>
export default {
  data() {
    return {
      snake: [{x: 10, y: 10}],
      food: {x: 15, y: 15},
      direction: 'right',
      score: 0,
      gameLoop: null,
      gameStatus: false
    };
  },
  mounted() {
    this.initCanvas();
    uni.onWindowResize(this.handleResize);
  },
  onUnload() {
    uni.offWindowResize(this.handleResize);
    if(this.gameLoop) clearInterval(this.gameLoop);
  },
  methods: {
    handleResize() {
      this.initCanvas();
    },
    handleDirectionChange(direction) {
      if(this.isValidDirection(direction)) {
        this.direction = direction;
      }
    },
    initCanvas() {
      const ctx = uni.createCanvasContext("gameCanvas", this);
      ctx.fillStyle = '#4CAF50';
      ctx.fillRect(this.snake[0].x * 10, this.snake[0].y * 10, 10, 10);
      ctx.draw();
    },
    moveSnake() {
      let head = {...this.snake[0]};
      switch(this.direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
      }

      if(this.checkCollision(head)) {
        this.gameOver();
        return;
      }

      this.snake.unshift(head);
      if(head.x === this.food.x && head.y === this.food.y) {
        this.score += 10;
        this.generateFood();
      } else {
        this.snake.pop();
      }
      this.drawGame();
    },
    checkCollision(head) {
      return head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 30 || 
             this.snake.some((seg, index) => index !== 0 && seg.x === head.x && seg.y === head.y);
    },
    generateFood() {
      this.food = {
        x: Math.floor(Math.random() * 29),
        y: Math.floor(Math.random() * 29)
      };
      console.log(this.food);
    },
    drawGame() {
      const ctx = uni.createCanvasContext("gameCanvas", this);
      ctx.clearRect(0, 0, 300, 300);
      
      // 绘制蛇
      ctx.fillStyle = '#4CAF50';
      this.snake.forEach(seg => {
        ctx.fillRect(seg.x * 10, seg.y * 10, 9, 9);
      });
      
      // 绘制食物
      ctx.fillStyle = '#FF5722';
      ctx.beginPath();
      ctx.arc(this.food.x * 10 + 5, this.food.y * 10 + 5, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.draw();
    },
    isValidDirection(newDir) {
      const opposite = {
        up: 'down', down: 'up', left: 'right', right: 'left'
      };
      return newDir !== opposite[this.direction];
    },
    startGame() {
      if(this.gameLoop) clearInterval(this.gameLoop);
      this.snake = [{x: 10, y: 10}];
      this.direction = 'right';
      this.score = 0;
      this.generateFood();
      this.gameStatus = true;
      this.gameLoop = setInterval(() => this.moveSnake(), 200);
    },
    gameOver() {
      clearInterval(this.gameLoop);
      this.gameStatus = false;
      uni.showModal({
        title: '游戏结束',
        content: `最终得分：${this.score}`, 
        showCancel: false
      });
    }
  }
};
</script>

<style scoped lang="scss">
.snake {
  .content {
    padding: 32rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .score {
      font-size: 36rpx;
      margin-bottom: 20rpx;
      color: #333;
    }

    .game-canvas {
      width: 300px;
      height: 300px;
      border: 2rpx solid #ddd;
      border-radius: 8rpx;
      background: #f9f9f9;
      margin-bottom: 30rpx;
    }

    .start-btn {
      width: 200rpx;
      height: 70rpx;
      line-height: 70rpx;
      background: #4CAF50;
      color: white;
      border-radius: 35rpx;
      font-size: 28rpx;
    }
    .control-btns {
      position: relative;
      width: 300rpx;
      height: 300rpx;
      margin-top: 30rpx;

      .direction-btn {
        position: absolute;
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        background: #4CAF50;
        color: white;
        font-size: 40rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.9;

        &:active {
          opacity: 0.7;
        }

        &.up {
          top: 0;
          left: 110rpx;
        }
        &.down {
          bottom: 0;
          left: 110rpx;
        }
        &.left {
          top: 110rpx;
          left: 0;
        }
        &.right {
          top: 110rpx;
          right: 0;
        }
      }
    }
  }
}
</style>
  