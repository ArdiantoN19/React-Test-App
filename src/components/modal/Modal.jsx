/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BiBookOpen } from "react-icons/bi";
import Button from "../styled/Button";

const ModalBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #ebf3f3;
  z-index: 100;
`;

const ModalContainer = styled.div`
  width: 350px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);

  @media screen and (min-width: 600px) {
    width: 600px;
  }
`;

const ModalHeader = styled.div`
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  text-transform: uppercase;
  & + p {
    color: #f0a967;
  }
`;

const ModalBody = styled.ol`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;

  Button {
    transition: box-shadow 0.1s ease-in-out;

    &:hover {
      box-shadow: 5px 5px 0 black;
    }
    &:active {
      box-shadow: 0 0 0 transparent;
    }
  }
`;

const Linked = styled(Link)`
  display: block;
  text-decoration: none;
  background: transparent;
  padding: 8px 10px;
  border: 1px solid #11111f;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  transition: box-shadow 0.1s ease-in-out;

  &.disabled {
    border: 1px solid #eee;
    background-color: #eee;
    color: #a1a1a1;
    box-shadow: none;
    cursor: default;
    pointer-events: none;
    &:hover {
      box-shadow: none;
    }
  }

  &:hover {
    box-shadow: 5px 5px 0 black;
  }
  &:active {
    box-shadow: 0 0 0 transparent;
  }
`;

const Modal = ({ isShow, setIsShow, id }) => {
  const [countdown, setCountdown] = useState(11);

  useEffect(() => {
    const intervalCountdown = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(intervalCountdown);
  }, [countdown, isShow]);

  const onCloseModal = () => {
    setCountdown(11);
    setIsShow(false);
  };

  if (!isShow) {
    return null;
  }

  return (
    <ModalBackground>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>
            <BiBookOpen /> Panduan pengerjaan soal
          </ModalTitle>
          <p>
            Harap baca dengan seksama panduan dibawah ini, demi kelancaran
            pengerjaan soal!
          </p>
        </ModalHeader>
        <ModalBody>
          <li>Soal ini terdiri dari 10 pertanyaan.</li>
          <li>
            Tipe dan jenis soal disesuaikan dengan Kategori soal yang Anda
            pilih.
          </li>
          <li>
            Soal ini memiliki batas waktu pengerjaan yang telah ditentukan.
          </li>
          <li>
            Pastikan Anda benar-benar yakin ketika memilih jawaban, karena jika
            Anda sudah memilih jawaban soal akan otomatis berpindah ke nomor
            berikutnya dan Anda tidak bisa mengoreksi jawaban sebelumnya.
          </li>
          <li>Soal akan otomatis tertutup jika waktu pengerjaan habis.</li>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onCloseModal}>Kembali</Button>
          <Linked
            to={`/question/${id}`}
            className={countdown <= 0 ? "" : "disabled"}
          >
            {countdown <= 0 ? "" : `(${countdown})`} Lanjutkan ke soal
          </Linked>
        </ModalFooter>
      </ModalContainer>
    </ModalBackground>
  );
};

Modal.propTypes = {
  id: PropTypes.number,
  isShow: PropTypes.bool.isRequired,
  setIsShow: PropTypes.func.isRequired,
};

export default Modal;
