import style from '../scss/header.module.scss';

const moveToHome = () => {
  window.location.replace('/');
}

const Header = () => {
  return (
    <>
      <header className={style['header']}>
        <div onClick={moveToHome} className={style["container"]}>
          <div className={style["logo"]}></div>
          <ul>
            <li>
              <div>무신사X온글잎 이벤트</div>
            </li>
            <li>
              <div>폰트제작</div>
            </li>
            <li>
              <div>상품안내</div>
            </li>
            <li>
              <div>온글잎 무료폰트</div>
            </li>
            <li>
              <div>FAQ-문의하기</div>
            </li>
            <button className={style["btn-login"]}>로그인</button>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
