import React from 'react';
import Head from 'next/head';
import AppLayout from 'components/AppLayout';
import { indexStyle, jumbotronStyle, sectionStyle } from './index.styles';

import i18n from '../i18n';
import Router from 'next/router';

class AboutUsPage extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    const searchQuery = e.target.query.value.trim();

    this.setState({ isSubmitting: false });

    Router.push(`/articles?q=${searchQuery}`);
  };

  render() {
    return (
      <div className={``}>
        <AppLayout>
          <div className="root wrapper-page">
            <Head>
              <title>
                {/*TODO:: ChangeKey to About Page*/}
                About Us
              </title>
            </Head>

          </div>
          <div className="section section-line">
            <div className="container">
              <div className="content">
                <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <h2 className="text-center mb-md-5 mb-3">Cofact – Join us as a fact checker!</h2>
                    <p>
                    <strong>Cofact Project or the collaborative fact-checking platform in Thailand</strong> is an initiative by a network of civil society in Thailand that intends to establish an open, safe, and creative space for co-finding facts in the “info-demic” era. Whereby, the “info-demic” in this term means that information in the online sphere can be created with any subjective purposes and disseminated with fast-paced speed. Therefore, this nature of communication can lead to misunderstanding and confusion that makes it hard to believe in anyone or anything. 
                    </p>
                    <p>
                    The founders of CoFact was inspired by CoFact initiative started in Taiwan, the efforts by the civil society network who believe in the power of people’s sector in dealing with the dark side of information by creating an open platform for anyone from any sector can help in fact-finding, preventing any side to hold the absolute truth alone. It is since fact could also change through time and other relevant factors. 
                    </p>
                    <p>
                    In mid 2019, the civil society in Thailand held the “International Conference on Fake News” led by the association of eight organizations such as the Thai Media Fund, the Thai Health Promotion Foundation, Friedrich Naumann Foundation for Freedom (FNF), the Thai Public Broadcasting Service, the National Press Council of Thailand, SONP, the Faculty of Communication Arts of Chulalongkorn University, and the Faculty of Journalism and Mass Communication of Thammasat University. In this conference, all the eight organizations signed the declaration to join forces in fighting against fake news. This event had the honor of having Honorable Audrey Tang, the Digital Minister of Taiwan, as a keynote speaker to share her experience in prototyping Cofact of Taiwan. This led to the cooperation and consequently led to Thailand’s Cofact project.
                    </p>
                    <p>
                    The concept of Cofact is the integration between the use of “civic tech” and “journalism”, where the editorial team works with volunteers in verifying news or content from credible sources and providing the space for the public to share and to exchange factual information and personal opinions. In addition, CoFact provides a chatbot service, an auto responsive program, which is available for the public to submit any news or content to the editorial team to check for verification. Verified content will then be posted on social media and mainstream media outlets. Some will be developed as in-depth news and featured as the “Cofact Journalism” project.  For instance, content that is interesting as a result of going viral from being fact or fake news, or some that is interesting in terms of public policy and value to the public.   
                    </p>
                    <p>
                    Cofact is preliminarily supported by the organizations that prioritize this matter—the Thai Health Promotion Foundation, Centre for Humanitarian Dialogue (HD), and Friedrich Naumann Foundation for Freedom (FNF)—and is operated by the teams of ChangeFusion and OpenDream, together with content contributors and supporters such as the Foundation For Consumers, the Wisesight, as well as government organizations, like, the Thai Media Fund, and Sure Before Share, as well as other local civil society, universities, and journalism professional organizations.
                    </p>
                    <p>Cofact believes that in order to solve the problem of fake news in this digital era is to turn everyone into a fact-checker and to create a space for collaborative fact findling by providing a platform as the marketplace of ideas, where it could analyze and differentiate between facts and opinions, and by believing in the society’s judgment. Eventually, even if we could believe in nothing, we shall believe in nothing until the fact is ruled out and manifested, which is better than believing without any consideration or having a “blind trust”. As Ms. Audrey Tung was quoted in the conference in Bangkok that <strong>“blind trust is worse than no trust!”</strong> - to believe in something blindly is worse than to not believe in anything. </p>
                    <p>Hence in this information era, join us in fact-checking. Let us all begin with this health crisis, of COVID-19 pandemic which threatens every citizen worldwide. This virus has arrived together “Infodemic”, the information pandemic. We have compiled some articles here already. It only waits for you to join Cofact community in order to create the wellbeing of our society. </p>
                    
                    <h4>Credit</h4>
                    <p>
                    If you would like to create your very own Cofact, you can download Taiwan’s original source code&nbsp;<a href="https://github.com/cofacts" target="_blank">here.</a>
                    &nbsp;Or you can also develop further from the version of TaiThai&nbsp;<a href="https://github.com/search?q=topic%3Acofacts+fork%3Atrue+org%3Aopendream&type=Repositories" target="_blank">here.</a>
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Section#3*/}
          <div className="section section-partner py-3 py-lg-4 bg-white">
            <h2 className="text-center my-4">Partners</h2>
            <div className="container">
              <ul className="partner-list">
                <li>
                  <a href="https://www.thaihealth.or.th/" target="_blank">
                    <img
                      src="/static/img/partner/logo-thaihealth@2x.png"
                      alt="สสส."
                      className="img-fluid"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://www.hdcentre.org/" target="_blank">
                    <img
                      src="/static/img/partner/logo-hd@2x.png"
                      alt="HD Centre"
                      className="img-fluid"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://thailand.fnst.org/" target="_blank">
                    <img
                      src="/static/img/partner/logo-f@2x.png"
                      alt="มูลนิธิฟรีดริช เนามัน"
                      className="img-fluid"
                    />
                  </a>
                </li>
                <li>
                  <a href="http://www.thaimediafund.or.th/" target="_blank">
                    <img
                      src="/static/img/partner/logo-tmf@2x.png"
                      alt="THAI MEDIA FUND"
                      className="img-fluid"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://changefusion.org/" target="_blank">
                    <img
                      src="/static/img/partner/logo-cf@2x.png"
                      alt="CHANGEFUSION"
                      className="img-fluid"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://www.opendream.co.th/" target="_blank">
                    <img
                      src="/static/img/partner/logo-od@2x.png"
                      alt="OPENDREAM"
                      className="img-fluid"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://wisesight.com/" target="_blank">
                    <img
                      src="/static/img/partner/logo-wisesight@2x.png"
                      alt="WISESIGHT"
                      className="img-fluid"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://www.consumerthai.org/" target="_blank">
                    <img
                      src="/static/img/partner/logo-ffc@2x.png"
                      alt="มูลนิธิเพื่อผู้บริโภค"
                      className="img-fluid"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <style> {sectionStyle} </style>

          <style jsx>
            {`
              
              /* Section LINE */

              .section-line {
                background: #f0b4d0 url('static/img/bg-gp-cofact.png') no-repeat
                  left center;
                background-size: 90%;
                margin: 1rem 0 0;
              }

              @media screen and (min-width: 768px) {
                .section-line {
                  background-size: 40%;
                  padding-bottom: 5rem;
                }
              }

              .content {
                padding: 3rem 0;
              }

              .content p {
                font-size: 1.25rem;
                font-weight: 300;
                text-align: justify;
              }


              /* Parner List */
              .partner-list {
                list-style: none;
                margin: 0;
                padding: 0;
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                justify-content: center;
              }
              .partner-list li {
                flex: 0 0 50%;
              }
              @media screen and (min-width: 768px) {
                .partner-list li {
                  flex: 0 0 240px;
                }
              }

            `}
          </style>
        </AppLayout>
      </div>
    );
  }
}

export default AboutUsPage;
