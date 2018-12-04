import React, { Component } from 'react'
import './App.css'
import Layout from './Layout'

class faq extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <Layout>
        <div className="faq-size">
          <h2 class='center-align margin-top-100 margin-bottom-50'>FAQ</h2>
          <h5 class='margin-bottom-30'>Getting started</h5>
          <ul class="collapsible margin-bottom-30">
            <li>
              <div class="collapsible-header">크립토곤은 무엇입니까?</div>
              <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
            <li>
              <div class="collapsible-header">어떻게 시작하나요?</div>
              <div class="collapsible-body"><span>
                <div>메인화면의 start버튼을 누루거나 상단메뉴에 login버튼을 눌러 로그인 페이지로 이동한 후 REGISTER NOW!에서 회원가입을 합니다.</div>
                <div>회원가입을 한 후 로그인을 하면 새로운 메뉴들이 나타납니다.</div>
              </span></div>
            </li>
            <li>
              <div class="collapsible-header">크립토곤은 어떻게 얻을 수 잇습니까?</div>
              <div class="collapsible-body"><span>
                <div>크립토곤을 얻는 방법은 Market, Event메뉴에서 구매를 하거나 다른사용자로부터 선물을 받는방법이 있습니다.</div>
                <div>용끼리 교배를 통해서 새로운 용을 얻을수도 있습니다.</div>
              </span></div>
            </li>
          </ul>

          <h5 class='margin-bottom-30'>Buying and selling</h5>
          <ul class="collapsible margin-bottom-30">
            <li>
              <div class="collapsible-header">크립토곤을 구매하는 방법은 무엇입니까?</div>
              <div class="collapsible-body"><span>로그인을 하고 Market에서 마음에 드는 용의 페이지로 이동한 후 Buy버튼을 눌러 구매하거나 Event메뉴에서 원하는 용을 선택한 후 구매하기버튼으로 구매할 수 있습니다.</span></div>
            </li>
            <li>
              <div class="collapsible-header">크립토곤을 판매하는 방법은 무엇입니까?</div>
              <div class="collapsible-body"><span>
                <div>나의용의 소유권을 판매할수도 있고 씨앗만 판매할수도 있습니다.</div><br/>
                <div>* 나의용의 소유권을 판매</div>
                <div>판매할 용의 페이지로 이동한 후 Sell버튼을 클릭합니다.</div>
                <div>판매가격과, 판매기간을 설정한 후 Sell to Market버튼을 눌러 Market에 등록을 합니다.</div><br/>
                <div>* 나의용의 씨앗을 판매</div>
                <div>씨앗을 판매할 용(부)의 페이지에서 Breed버튼을 클릭합니다.</div>
                <div>판매가격과, 판매기간을 설정한 후 Siring버튼을 눌러 Market에 등록을 합니다.</div>
              </span></div>
            </li>
            <li>
              <div class="collapsible-header">통화는 어떻게 얻을 수 있습니까?</div>
              <div class="collapsible-body"><span>
                <div>* 다이아 얻는 방법?</div>
                <div>결제하기 메뉴를 통해 다이아를 구매할 수 있습니다. 또는 Market에 나의 용이나 나의용의 씨앗을 판매해서 다이아를 얻을 수 있습니다.</div><br/>
                <div>* 골드 얻는 방법?</div>
                <div>배틀을 할때마다 골드를 얻을 수 있고 승리시에는 추가 골드를 얻을 수 있습니다.</div><br/>
                <div>* 트로피 얻는 방법?</div>
                <div>토너먼트에서 우승할 시 그에 맞는 트로피를 획득할 수 있습니다.</div>
              </span></div>
            </li>
          </ul>

          <h5 class='margin-bottom-30'>Breeding</h5>
          <ul class="collapsible margin-bottom-30">
            <li>
              <div class="collapsible-header">크립토곤의 교배는 어떻게 하나요?</div>
              <div class="collapsible-body"><span>
                <div>용의 교배는 나의용과 나의용의 교배, 나의용과 다른사용자 용의 교배가 있습니다.</div>
                <div>교배를 하면 알이 태어나고 태어난 알은 포란기간(쿨타임) 후 깨어납니다. (미정)</div>
                <div>교배를 한 용들은 다음 행동을 위한 휴식기간(쿨타임) 가지게 됩니다. (미정)</div><br/>
                <div>* 나의용과 나의용의 교배</div>
                <div>교배를 할 용(부)의 페이지에서 Breed버튼을 클릭합니다.</div>
                <div>+ 버튼을 눌러 교배할 용(모)를 선택합니다.</div>
                <div>ok, Breed!버튼을 눌러 교배를 시작합니다.</div><br/>
                <div>* 나의용과 다른사용자 용과의 교배</div>
                <div>Market에 Siring으로 올라온 용의 페이지에서 Siring버튼을 클릭합니다.</div>
                <div>+ 버튼을 눌러 교배할 나의 용(모)를 선택합니다.</div>
                <div>ok, Breed!버튼을 누루면 다이아를 내고 씨앗을 제공받아 교배를 시작합니다.</div>
              </span></div>
            </li>
            <li>
              <div class="collapsible-header">크립토곤의 교배대상은 어떻게 되나요?</div>
              <div class="collapsible-body"><span>
                교배대상은 형제와 부모를 제외한 용과 가능합니다.
              </span></div>
            </li>
            <li>
              <div class="collapsible-header">교배한 용들과 알의 쿨타임은 어떻게 되나요?</div>
              <div class="collapsible-body"><span>
                <div>교배를 한 용은 용의 세대, 교배횟수에 따라 쿨타임이 결정됩니다.(미정)</div>
                <div>알의 쿨타임은 (미정)으로 결정됩니다.</div>
              </span></div>
            </li>
          </ul>

          <h5 class='margin-bottom-30'>Item</h5>
          <ul class="collapsible margin-bottom-30">
            <li>
              <div class="collapsible-header">아이템은 무엇입니까?</div>
              <div class="collapsible-body"><span>
                <div>아이템은 검, 방패, 배경 등이 있고 배틀이나 토너먼트에서 전투를 더 유리하게 하거나 나의 용을 꾸미는데 사용합니다.</div>
              </span></div>
            </li>
            <li>
              <div class="collapsible-header">아이템을 구매하는 방법은 무엇입니까?</div>
              <div class="collapsible-body"><span>
                <div>아이템은 Item이나 Event메뉴에서 구매를 할 수 있습니다.</div>
              </span></div>
            </li>
            <li>
              <div class="collapsible-header">아이템을 착용하는 방법은 무엇입니까?</div>
              <div class="collapsible-body"><span>
                <div>착용할 용의 페이지로 이동한 후 원하는 아이템의 +버튼을 통해 착용할 수 있습니다.</div>
              </span></div>
            </li>
          </ul>

          <h5 class='margin-bottom-30'>Battle</h5>
          <ul class="collapsible margin-bottom-30">
            <li>
              <div class="collapsible-header">배틀이 무엇인가요?</div>
              <div class="collapsible-body"><span>
                <div>배틀은 나의용과 다른사용자의 용이 전투를 하는 것입니다.</div>
                <div>배틀참가시 골드를 얻을 수 있고 승리할 경우 추가골드를 얻을 수 있습니다.</div>
              </span></div>
            </li>
            <li>
              <div class="collapsible-header">배틀하는 방법은 어떻게 되나요?</div>
              <div class="collapsible-body"><span>
                <div>배틀메뉴의 대기실에서 +버튼을 눌러 원하는 용을 선택한 후 ok,배틀시작버튼을 클릭합니다.</div>
                <div>배틀은 한번에 하나의 용만 전투를 할 수 있습니다.</div>
                <div>전투가 끝난 용은 일정시간의 휴식기간(쿨타임)을 가지게 됩니다.</div>
              </span></div>
            </li>
            <li>
              <div class="collapsible-header">토너먼트는 무엇인가요?</div>
              <div class="collapsible-body"><span>
                <div></div>
              </span></div>
            </li>
            <li>
              <div class="collapsible-header">토너먼트를 하는 방법은 어떻게 되나요?</div>
              <div class="collapsible-body"><span>
                <div></div>
              </span></div>
            </li>
          </ul>

          <h5 class='margin-bottom-30'>Other</h5>
          <ul class="collapsible margin-bottom-30">
            <li>
              <div class="collapsible-header">이벤트용과 이벤트아이템은 무엇입니까?</div>
              <div class="collapsible-body"><span>
                <div>이벤트메뉴에서 일정기간 동안만 판매하는 용과 아이템입니다.</div>
                <div>구매시 특별한 아이콘을 획득할 수 있습니다.</div>
              </span></div>
            </li>
            <li>
              <div class="collapsible-header">아이콘은 무엇입니까?</div>
              <div class="collapsible-body"><span>
                <div>아이콘은 나의 프로필 옆의 이미지를 말하며 특정한 업적을 쌓거나 이벤트용과 아이템을 구매시 얻을 수 있습니다.</div>
              </span></div>
            </li>
          </ul>
        </div>
      </Layout>
    )
  }
}

export default faq
