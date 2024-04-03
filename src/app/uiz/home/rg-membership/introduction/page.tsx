'use client'

import { useState } from 'react'
import { Button, Margin, Modal } from '@/ui/common/common-components'
import { useScreenMode } from '@/ui/context/StyleContext'
import { useRefIframeHeight } from '../_cpnt/IFrameWrapper'

export default function Page() {
  const isMobile = useScreenMode() === 'mobile'

  const [viewModal, _viewModal] = useState(false)
  const { iframeRef, onIframeLoad, height } = useRefIframeHeight()

  return (
    <div>
      <iframe
        width={'100%'}
        onLoad={onIframeLoad}
        frameBorder="0"
        scrolling="no"
        ref={iframeRef}
        src={
          isMobile
            ? '/src/html/page-contents/mobile/rg-membership/membership_01_info.html'
            : '/src/html/page-contents/pc/rg-membership/membership_01_info.html'
        }
        style={{
          backgroundColor: 'transparent',
          overflow: 'hidden',
          height: `${height}px`,
        }}
      />
      {height > 0 && (
        <>
          <Margin height={20} />
          <div style={{ width: isMobile ? '100%' : '300px', margin: 'auto' }}>
            <Button
              shadow
              onClick={() => {
                viewModal ? _viewModal(false) : _viewModal(true)
              }}>
              자세히 보기
            </Button>
          </div>
          {isMobile ? <></> : <Margin height={50} />}
          {viewModal && (
            <Modal
              header={true}
              title={''}
              compact={false}
              onClickDelete={() => {
                _viewModal(false)
              }}
              onClickLightbox={() => {
                _viewModal(false)
              }}>
              <iframe
                width={'100%'}
                frameBorder="0"
                scrolling="no"
                src={
                  isMobile
                    ? '/src/html/page-contents/mobile/rg-membership/membership_pop01.html'
                    : '/src/html/page-contents/pc/rg-membership/membership_pop01.html'
                }
                style={{
                  borderRadius: 15,
                  backgroundColor: 'transparent',
                  overflow: 'hidden',
                  height: '73vh',
                }}
              />
              <Margin height={20} />
              <div style={{ width: '300px', margin: 'auto' }}>
                <Button
                  shadow
                  onClick={() => {
                    window.open(
                      'https://www.readinggate.com/Payment/Price',
                      '_blank',
                    )
                  }}>
                  구매하러 가기
                </Button>
              </div>
              <Margin height={30} />
            </Modal>
          )}
        </>
      )}
    </div>
  )
}
