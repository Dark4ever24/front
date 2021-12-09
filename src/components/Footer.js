import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
    <Container>
      <Row>
        <Col style={{fontSize:"12px"}} className="text-center py-3">Copyright &copy; Skyline Paradise 2022</Col>
     <div style={{fontSize:"12px"}}className = "text center py-3">Made with ❤️ and 🌿🚬</div>
        
      </Row>
    </Container>
  </footer>
  )
}

export default Footer
