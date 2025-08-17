# Split Flap

CSS 애니메이션과 리액트를 활용한 스플릿 플랩 컴포넌트입니다. 
`SplitFlap` 컴포넌트는 `value`를 프롭으로 받아서 큐(`animatedFlapQueue`)에 등록합니다. 큐에 등록된 순서대로 플랩이 렌더링 되고, 렌더링 된 플랩은 내려가는 애니메이션 실행 후 `onAnimationEnd` 핸들러에 의해 큐에서 제거됩니다. 

## 내부 `@keyframes`
```css
@keyframes flap-current {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(180deg);
  }
}
@keyframes flap-next {
  0% {
    transform: rotateX(-180deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}
```
`<SplitFlapKeyframes />` 컴포넌트를 필요한 곳에 렌더링해야 플랩 애니메이션이 정상적으로 실행됩니다. 