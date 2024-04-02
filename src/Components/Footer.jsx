import React from 'react'
import '../Styles/Footer.css'
import { Link } from 'react-router-dom'
import Logo from '../Assets/Logo/LogoForBonnitaaa.jpg'

const Footer = () => {
  return (
    <div className='FooterBgColor '>
      <div className=''>
        <div className='row ps-5 pe-5 '>
          <div className='col-md-4 d-flex justify-content-center text-md-start text-center gap-4 mx-auto my-auto'>
            <div>
              <p className='pt-lg-4'>
                <a href='tel:+918220773182'>+91-8220773182</a>
              </p>
              <p className='mt-3'>
                <a href='mailto:bonnita3182@gmail.com'>bonnita3182@gmail.com</a>
              </p>

              <p className='mt-3'>
                No.4. Noombal Main Road, ICL Home Town, <br /> Noombal,
                Velappanchavadi Chennai - 600 077
              </p>
              <div class='wrp mt-md-3'>
                <Link to='' class='icon icon-twitter'>
                  <i class='fa fa-twitter'></i>
                </Link>
                <Link to='' class='icon icon-facebook'>
                  <i class='fa fa-facebook'></i>
                </Link>
                <Link
                  to='https://www.instagram.com/bonnita_06/?igsh=MXcxdXVoa3c2YWYzNg%3D%3D'
                  target='_blank'
                  class='icon icon-instagram'
                >
                  <i class='fa fa-instagram'></i>
                </Link>
                <Link
                  to='https://www.youtube.com/@bonnita_06?si=0SKH9YdoYTJUdY9p'
                  target='_blank'
                  class='icon icon-instagram'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    fill='currentColor'
                    class='bi bi-youtube'
                    viewBox='0 0 16 16'
                  >
                    <path
                      style={{ width: '16px', height: '16px' }}
                      d='M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z'
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className='col-md-4 d-flex flex-column justify-content-center align-items-center'>
            <div>
              <img src={Logo} alt='#' className='img-fluid' />
            </div>
          </div>
          <div className='col-md-4 d-flex justify-content-center  text-md-start text-center gap-4 mt-md-0 mb-md-0 mb-5 mt-4 mx-auto my-auto'>
            <div>
              <Link to='shoppage'>
                <p className='mb-3'>Products</p>
              </Link>
              <Link to='UserRegister'>
                <p className='mb-3'>Sign Up</p>
              </Link>
              {/* <p className="mb-3">Who we are</p> */}
              <Link to='cart'>
                <p className='mb-3'>My Cart</p>
              </Link>
            </div>
            <div className=''>
              <Link
                to='https://bonnita.s3.ap-south-1.amazonaws.com/PrivacyPoliciesBonnita.pdf'
                target='_blank'
              >
                {' '}
                <p className='mb-3'>Privacy Policy</p>
              </Link>
              <Link
                to='https://bonnita.s3.ap-south-1.amazonaws.com/Terms+and+conditions+BONNITA.pdf'
                target='_blank'
              >
                <p className='mb-3'>Terms & Conditions</p>
              </Link>
              <Link to='/termsAndCondition' target='_blank'>
                <p className='mb-3'>Return & Refund Policy</p>
              </Link>
              <Link to='/UserLogin'>
                {' '}
                <p className='mb-3'> Sign In</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
